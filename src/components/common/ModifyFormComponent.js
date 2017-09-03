'use strict';

import React from 'react';
import {
  List,
  ImagePicker,
  InputItem,
  TextareaItem,
  Radio,
  DatePicker,
  Accordion,
  Picker,
  Checkbox,
  Switch,
  Stepper,
  Toast
} from 'antd-mobile';
import {countryProvinceCity, province, country, county} from 'parsec-area-data';
import * as request from '../../utils/request';
import InputSelect from './InputSelectComponent';
import Tags from './TagsComponent';
import TreeView from './TreeViewComponent';

require('styles/common/ModifyForm.less');

class ModifyFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.getInputItemType = this.getInputItemType.bind(this);
    this.initOptinData = this.initOptinData.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentWillMount() {
    console.log('countryProvinceCity', countryProvinceCity);
    console.log('province', province);
    console.log('country', county);
    console.log('country', county);
    this.initOptinData();
  }


  //初始化下拉框字段的选项
  initOptinData() {
    this.props.columns.forEach((item) => {
      if (typeof item.chlidOptionsUrl == 'string') {
        //跳过
        if (item.dataType == 'transfer' || item.dataType == 'inputSelect') {
          return;
        }

        let headers = {};
        if(!!item.headers){
          headers = item.headers;
        }
        let params = item.chlidOptionsParams || {};
        request.get(item.chlidOptionsUrl,params,headers).then((data)=>{
          if (data.code === 200 || data.msg === 'ok') {
            data = (data.list || data.lsts || data.array || data.lst || data.result);
            if (typeof item.dataWarp === 'function') {
              data = item.dataWarp(data);
            }
            item.chlidOptions = data;
            this.setState({
              selectedRowKeys: this.state.selectedRowKeys,
              selectedRows: this.state.selectedRows
            });
          }else{
            Toast.fail(data.message,2);
          }
        });
      }
    });
  }

  validata(v, value) {
    // console.log(v, value);
    const form = this.props.form;
    let record = form.getFieldsValue();
    if (v.test) {
      return v.test(value);
    } else if (typeof v === 'function') {
      return v(value, record);
    }
    return false;
  }

  //表单验证
  handleValidata(rule, value = '', callback, source, options, item) {
    const form = this.props.form;
    if (!!item.hasOwnProperty('isRequired') && !item.isRequired) {
      callback();
      return;
    }
    //正则验证
    if (item.validata) {
      //如果有过个条件
      if (item.validata instanceof Array) {
        let flag = false;
        for (let i = 0; i < item.validata.length; i++) {
          flag = this.validata(item.validata[i], value);
        }
        if (flag) {
          callback();
        } else {
          callback([new Error(item.validataMsgs.errorMsg)]);
        }
      } else {
        if (item.validata && (value == undefined || value.toString().length == 0)) {
          callback([new Error(item.validataMsgs.emptyMsg || '请输入' + item.title)]);
          return;
        }

        if (!this.validata(item.validata, value)) {
          //console.log(item.validata,value);
          callback([new Error(item.validataMsgs.errorMsg)]);
          return;
        }
      }
    }
    //绑定验证
    if (item.bindValidata && form.getFieldValue(item.bindValidata) != value) {
      callback([new Error(item.validataMsgs.errorMsg)]);
      return;
    }
    let reBindValue = form.getFieldValue(item.reBind);
    if (reBindValue != undefined && reBindValue != null && item.reBind && reBindValue != value) {
      let obj = {};
      obj[item.reBind] = {
        value: form.getFieldValue(item.reBind),
        errors: [{
          field: item.reBind,
          message: item.validataMsgs.reBindError,
        }]
      };
      this.props.form.setFields(obj);
    }
    //远程服务器验证
    if (item.remoteValidata) {
      request.get(item.remoteValidata,{},{}).then(()=>{
        callback([new Error('用户名已经存在')]);
      }).then(()=>{
        if (value != 'fuchuan') {
          callback();
        } else {
          callback([new Error('用户名已经存在')]);
        }
      });
    } else {
      callback();
    }
  }

  getInputItemType(dataIndex) {
    let type = 'text';
    switch (dataIndex) {
      case 'text':
        type = 'text';
        break;
      case 'mobile_phone':
        type = 'phone';
        break;
      case 'bankCard':
        type = 'bankCard';
        break;
      case 'password':
        type = 'password';
        break;
      case 'money':
        type = 'money';
        break;
      default:
        type = 'text';
        break;
    }
    return type;
  }

  render() {
    const {getFieldDecorator, getFieldProps, getFieldError} = this.props.form;
    let values = this.props.form.getFieldsValue();

    if (!!this.props.instance && !!values.id) {
      values = Object.assign({}, this.props.instance.state.modifyRow, values);
    }

    //过滤可编辑项并按类型创建输入框
    this.props.columns.map((item) => {
      item.key = item.dataIndex;
    });

    let formItem = this.props.columns.filter((item) => {
      if (!!item.chlidOptions && typeof item.chlidOptions === 'object' && item.chlidOptions.length > 0) {
        item.chlidOptions.map((option) => {
          return option.label = option.text;
        });
      }
      if (typeof item.editable === 'function') {
        return item.editable(values || this.props.instance.state.modifyRow);
      } else {
        return item.editable;
      }
    }).map((item,index) => {
      let input;
      //FIX 修复别名没有初始化值
      if (!!item.dataIndexAlia) {
        getFieldProps(item.dataIndexAlia);
      }

      //是否禁用
      let disabled = false;
      if (!!values && values.id != null && values.id != undefined) {
        if (typeof item.disabled === 'function') {
          disabled = item.disabled(values);
        } else {
          disabled = !!item.disabled;
        }
      } else {
        disabled = !!item.disabled;
      }
      //是否编辑
      let editable = false;
      if (!!values && values.id != null && values.id != undefined) {
        if (typeof item.editable === 'function') {
          editable = item.editable(values);
        } else {
          editable = !!item.editable;
        }
      } else {
        editable = !!item.editable;
      }


      switch (item.dataType) {
        case 'hidden':
          return (<InputItem
            key={item.key || item.fieldId}
            {...getFieldProps(item.dataIndex, {
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue: item.defaultValue
            })}
            clear
            error={!!getFieldError(item.dataIndex)}
            onErrorClick={() => {
              Toast.info(getFieldError(item.dataIndex).join('、'), 3);
            }}
            autoComplete='off' placeholder={item.validataMsgs.tips}
            type='hidden'
          >{item.title}</InputItem>);
          break;
        case 'text':
          input = (<InputItem
            key={item.key || item.fieldId}
            {...getFieldProps(item.dataIndex, {
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue: item.defaultValue
            })}
            clear
            error={!!getFieldError(item.dataIndex)}
            onErrorClick={() => {
              Toast.info(getFieldError(item.dataIndex).join('、'), 3);
            }}
            disabled={disabled}
            editable={editable}
            autoComplete='off' placeholder={item.validataMsgs.tips}
            type={this.getInputItemType(item.dataIndex)}
          >{item.title}</InputItem>);
          break;
        case 'password':
          input = (<InputItem
            key={item.key || item.fieldId}
            {...getFieldProps(item.dataIndex, {
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue: item.defaultValue
            })}
            clear
            error={!!getFieldError(item.dataIndex)}
            onErrorClick={() => {
              Toast.info(getFieldError(item.dataIndex).join('、'), 3);
            }}
            disabled={disabled}
            editable={editable}
            autoComplete='off' placeholder={item.validataMsgs.tips}
            type='password'
          >{item.title}</InputItem>);
          break;
        case 'number':
          input = (<InputItem
            key={item.key || item.fieldId}
            {...getFieldProps(item.dataIndex, {
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue: item.defaultValue
            })}
            clear
            error={!!getFieldError(item.dataIndex)}
            onErrorClick={() => {
              Toast.info(getFieldError(item.dataIndex).join('、'), 3);
            }}
            disabled={disabled}
            editable={editable}
            autoComplete='off' placeholder={item.validataMsgs.tips}
            type='number'
          >{item.title}</InputItem>);
          break;
        case 'email':
          input = (<InputItem
            key={item.key || item.fieldId}
            {...getFieldProps(item.dataIndex, {
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue: item.defaultValue
            })}
            clear
            error={!!getFieldError(item.dataIndex)}
            onErrorClick={() => {
              Toast.info(getFieldError(item.dataIndex).join('、'), 3);
            }}
            disabled={disabled}
            editable={editable}
            autoComplete='off' placeholder={item.validataMsgs.tips}
            type='email'
          >{item.title}</InputItem>);
          break;
        case 'date':
          input = (
            <DatePicker
              key={`${item.key}_${item.optionItems.key}`}
              title={item.validataMsgs.tips}
              mode={item.optionItems.value}
              {...getFieldProps(item.dataIndex, {
                rules: [
                  {
                    validator: (rule, value, callback, source, options) => {
                      this.handleValidata = this.handleValidata.bind(this);
                      this.handleValidata(rule, value, callback, source, options, item);
                    }
                  }
                ],
                initialValue: item.initialValue
              })}
              disabled={disabled}
              minDate={item.minTime} //最小可选日期, 格式同 value  类型moment
              maxDate={item.maxTime} //最大可选日期, 格式同 value  类型moment
            >
              <List.Item arrow='horizontal'>{item.title}</List.Item>
            </DatePicker>
          );
          break;
        case 'checkbox':
        case 'inputSelect':
          input = (<div key={item.key || item.fieldId}>
            <List.Item arrow='horizontal'>{item.title}<InputSelect item={item} form={this.props.form}
                                                                   disabled={disabled} instance={this}/></List.Item>
            {getFieldDecorator(item.dataIndex, {rules: [
              {
                validator: (rule, value, callback, source, options) => {
                  this.handleValidata = this.handleValidata.bind(this);
                  this.handleValidata(rule, value, callback, source, options, item);
                }
              }
            ],initialValue: item.defaultValue})(<input key={`${item.dataIndex}_input`} type='hidden'/>)}
          </div>);
          break;
        case 'radio':
        case 'select':
          if(item.dataIndex === 'sex'){
            input = (<List.Item key={item.key || item.fieldId}
              extra={<Switch
                {...getFieldProps(item.dataIndex, {
                  initialValue: item.defaultValue,
                  valuePropName: 'checked',
                  rules: [
                    {
                      validator: (rule, value, callback, source, options) => {
                        this.handleValidata = this.handleValidata.bind(this);
                        this.handleValidata(rule, value, callback, source, options, item);
                      }
                    }
                  ]
                })}
                disabled={disabled}
              />}
            >{item.title}</List.Item>);
          }else{
            input = (<Picker key={item.key || item.fieldId} data={item.chlidOptions} cols={1}
                             title={item.validataMsgs.tips}
                             extra={item.validataMsgs.tips}
                             disabled={disabled} {...getFieldProps(item.dataIndex,{rules: [
              {
                validator: (rule, value, callback, source, options) => {
                  this.handleValidata = this.handleValidata.bind(this);
                  this.handleValidata(rule, value, callback, source, options, item);
                }
              }
            ],initialValue:item.initialValue})} className='forss'>
              <List.Item arrow='horizontal'>{item.title}</List.Item>
            </Picker>);
          }
          break;
        case 'inputUpload':
          // input = (<InputUpload item={item} form={this.props.form} disabled={disabled}/>);
          break;
        case 'tree':
          input = (<List.Item key={item.key || item.fieldId} arrow="horizontal" extra={
            <span
              {...getFieldProps(item.dataIndex, {
                rules: [
                  {
                    validator: (rule, value, callback, source, options) => {
                      this.handleValidata = this.handleValidata.bind(this);
                      this.handleValidata(rule, value, callback, source, options, item);
                    }
                  }
                ],
                initialValue: item.defaultValue
              })}
            >{item.validataMsgs.tips}</span>
          } onClick={()=>{
            TreeView.show(()=>{},this.props.form,item);
          }}>{item.title}</List.Item>);
          // input = (<List.Item key={item.key || item.fieldId} arrow="horizontal" extra={
          //   <span
          //     {...getFieldProps(item.dataIndex, {
          //       rules: [
          //         {
          //           validator: (rule, value, callback, source, options) => {
          //             this.handleValidata = this.handleValidata.bind(this);
          //             this.handleValidata(rule, value, callback, source, options, item);
          //           }
          //         }
          //       ],
          //       initialValue: item.defaultValue
          //     })}
          //   >{item.validataMsgs.tips}</span>
          // } onClick={()=>{
          //   console.log(item);
          //   window.location.href='#/tree/view?url='+item.operaUrl.loadDataUrl+'&param='+item.operaParams.type;
          // }}>{item.title}</List.Item>);
          break;
        case 'textarea':
          input = (
            <TextareaItem title={item.title} key={item.key || item.fieldId} autoHeight autoComplete='off' clear
                          count={item.count || 0}
                          disabled={disabled}
                          editable={editable}
                          {...getFieldProps(item.dataIndex,{
                            rules: [
                              {
                                validator: (rule, value, callback, source, options) => {
                                  this.handleValidata = this.handleValidata.bind(this);
                                  this.handleValidata(rule, value, callback, source, options, item);
                                }
                              }
                            ],
                            initialValue:item.initialValue
                          })}
                          placeholder={item.validataMsgs.tips}/>);
          break;
        case 'richtext':
          input = (<div>
            {/*<RichTextEditor item={item} height='200' form={this.props.form} disabled={disabled}/>*/}
            {getFieldProps(item.dataIndex, {initialValue: item.defaultValue})(<InputItem type='hidden'
                                                                                         disabled={disabled}
                                                                                         autoComplete='off'
                                                                                         placeholder={item.validataMsgs.tips}/>)}
          </div>);
          break;
        case 'tags':
          input = (<Tags item={item} height='200' form={this.props.form} disabled={disabled}/>);
          break;
        case 'cascader':
          let cols = 1, pData = [];
          switch (item.optionItems.value) {
            case 'country':
              pData = country; //国家
              cols = 1;
              break;
            case 'country-province':
              pData = province; //国家省
              cols = 2;
              break;
            case 'country-province-city':
              pData = countryProvinceCity; //国省市
              cols = 3;
              break;
            case 'province-city':
              pData = county; //省市县（区）
              cols = 3;
              break;
            default:
              cols = 1;
              break;
          }

          input = (
            <Picker key={item.key || item.fieldId} data={pData} cols={cols} title={item.validataMsgs.tips}
                    extra={item.validataMsgs.tips}
                    disabled={disabled} {...getFieldProps(item.dataIndex,{
              rules: [
                {
                  validator: (rule, value, callback, source, options) => {
                    this.handleValidata = this.handleValidata.bind(this);
                    this.handleValidata(rule, value, callback, source, options, item);
                  }
                }
              ],
              initialValue:item.initialValue
            })} className='forss'>
              <List.Item arrow='horizontal'>{item.title}</List.Item>
            </Picker>);
          break;
        default:
          input = null;
          break;
      }
      let tips = item.tips;
      if (typeof item.tips === 'function') {
        tips = item.tips(values);
      }
      return (<div key={`${item.fieldId}_${index}`}>
        {input}
        <List.Item.Brief className='tips' key={`${item.fieldId}_${index}_tips`}>{tips}</List.Item.Brief>
      </div>);
    });
    let formItemExt = (this.props.extColumns || []).map((item) => {
      return (
        <item.component form={this.props.form} item={item} key={item.key}/>
      )
    });

    let tips = this.props.tips || {};
    let showable = !!tips.showable;
    if (typeof tips.showable === 'function') {
      showable = tips.showable(values || this.props.instance.state.modifyRow);
    }

    return (
      <div className='modify-form-component'>
        {showable &&
        <div style={{
          textAlign: 'center',
          marginBottom: '10px'
        }}>{this.props.tips.text}</div>
        }
        <List>
          {formItem}
          {formItemExt}
        </List>
      </div>
    );
  }
}

ModifyFormComponent.displayName = 'CommonModifyFormComponent';

// Uncomment properties you need
// ModifyFormComponent.propTypes = {};
// ModifyFormComponent.defaultProps = {};

export default ModifyFormComponent;
