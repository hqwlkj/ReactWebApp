'use strict';

import React from 'react';
import {NavBar} from 'antd-mobile';
import ModifyForm from '../common/ModifyFormComponent';
import { createForm } from 'rc-form';

require('styles/account/Profile.less');

const testUserColnum = [{"sort":0,"title":"姓名","fieldId":10001,"isLogin":true,"dataType":"text","disabled":false,"editable":true,"showable":true,"validata":"^[a-zA-Z\\u4e00-\\u9fa5\\s\\-\\.]+$","dataIndex":"username","fieldType":0,"isDefault":true,"loginType":"no_pwd","isRequired":true,"searchable":{"name":"username","isDispaly":true},"isLoginItem":false,"showRequired":false,"validataMsgs":{"tips":"请输入姓名","emptyMsg":"姓名不能为空","errorMsg":"请输入正确的姓名"}},{"sort":1,"title":"邮箱","fieldId":10002,"isLogin":true,"dataType":"text","disabled":false,"editable":true,"showable":true,"validata":"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$","dataIndex":"email_address","fieldType":0,"isDefault":true,"loginType":"no_pwd","isRequired":true,"searchable":{"name":"email_address","isDispaly":true},"isLoginItem":false,"showRequired":false,"validataMsgs":{"tips":"请输入邮箱地址","emptyMsg":"邮箱地址不能为空","errorMsg":"请输入正确的邮箱地址"}},{"sort":2,"title":"手机号","fieldId":10003,"isLogin":true,"dataType":"text","disabled":false,"editable":true,"showable":true,"validata":"^0?(13[0-9]|14[57]|15[0-35-9]|17[01678]|18[0-9])\\d{8}","dataIndex":"mobile_phone","fieldType":0,"isDefault":true,"loginType":"password","isRequired":true,"searchable":{"name":"mobile_phone","isDispaly":true},"isLoginItem":true,"showRequired":true,"validataMsgs":{"tips":"请输入手机号码","emptyMsg":"手机号码不能为空","errorMsg":"请输入正确的手机号码"}},{"key":"1bk6bbhue","sort":3,"title":"班级4","fieldId":10316,"imgIcon":"614;","isLogin":false,"dataType":"radio","disabled":false,"editable":true,"showable":true,"validata":"","dataIndex":"radio_1499156814802","fieldType":1,"isDefault":true,"loginType":"no_pwd","operaIcon":"748;","operaItem":[{"icon":"748;","title":"添加项目","callType":"add_form_field"},{"icon":"","title":"批量编辑","callType":"batch_add_form_field"}],"isRequired":true,"searchable":{"name":"radio_1499156814802","isDispaly":true},"isLoginItem":false,"chlidOptions":[{"sort":1,"text":"一年级","value":"radio_item_1000000000293"},{"sort":2,"text":"二年级","value":"radio_item_1000000000389"},{"sort":3,"text":"三年级","value":"radio_item_1000000000212"}],"defaultValue":"radio_item_1000000000293","showRequired":false,"validataMsgs":{"tips":"请选择班级4","emptyMsg":"班级4不能为空","errorMsg":"请选择正确的班级4"}},{"key":"1bk6bo47m","sort":4,"title":"最喜欢的水果5","fieldId":10147,"imgIcon":"613;","isLogin":false,"dataType":"checkbox","disabled":false,"editable":true,"showable":true,"validata":"","dataIndex":"checkbox_1499157233687","fieldType":1,"isDefault":true,"loginType":"no_pwd","operaIcon":"748;","operaItem":[{"icon":"748;","title":"添加项目","callType":"add_form_field"},{"icon":"","title":"批量编辑","callType":"batch_add_form_field"}],"isRequired":true,"searchable":{"name":"checkbox_1499157233687","isDispaly":true},"isLoginItem":false,"chlidOptions":[{"sort":1,"text":"苹果","value":"checkbox_item_1000000000125"},{"sort":2,"text":"梨子","value":"checkbox_item_1000000000063"},{"sort":3,"text":"香蕉","value":"checkbox_item_1000000000155"},{"sort":5,"text":"橘子","value":"checkbox_item_1000000000169"}],"defaultValue":["checkbox_item_1000000000155","checkbox_item_1000000000063"],"showRequired":false,"validataMsgs":{"tips":"请选择最喜欢的水果5","emptyMsg":"最喜欢的水果5不能为空","errorMsg":"请选择正确的最喜欢的水果5"}},{"key":"1bk6c8tvj","sort":5,"title":"年收入6","fieldId":10085,"imgIcon":"611;","isLogin":false,"dataType":"select","disabled":false,"editable":true,"showable":false,"validata":"","dataIndex":"select_1499157777354","fieldType":1,"isDefault":true,"loginType":"no_pwd","operaIcon":"748;","operaItem":[{"icon":"748;","title":"添加项目","callType":"add_form_field"},{"icon":"","title":"批量编辑","callType":"batch_add_form_field"}],"isRequired":true,"searchable":{"name":"","isDispaly":false},"isLoginItem":false,"chlidOptions":[{"sort":1,"text":"3000-8000","value":"select_item_1000000000053"},{"sort":2,"text":"8000-15000","value":"select_item_1000000000193"},{"sort":3,"text":"15000以上","value":"select_item_1000000000077"}],"showRequired":false,"validataMsgs":{"tips":"请选择年收入6","emptyMsg":"年收入6不能为空","errorMsg":"请选择正确的年收入6"}},{"key":"1blhhkuq4","sort":6,"title":"性别7","fieldId":10011,"isLogin":false,"dataType":"radio","disabled":false,"editable":true,"showable":false,"validata":"^[01]$","dataIndex":"sex","fieldType":0,"isDefault":false,"inputState":true,"isRequired":true,"searchable":{"name":"","isDispaly":false},"chlidOptions":[{"text":"男","value":"1"},{"text":"女","value":"0"}],"defaultValue":"0","showRequired":true,"validataMsgs":{"tips":"请选择性别7","emptyMsg":"性别7不能为空","errorMsg":"请选择正确的性别7"}},{"key":"1blsblr33","tip":"仅支持jpg、jpeg、gif、png、bmp格式的图片。","sort":7,"title":"图像采集8","fieldId":10012,"isLogin":false,"dataType":"inputUpload","disabled":false,"editable":true,"multiple":false,"showable":true,"validata":"^\\S+$","dataIndex":"attendee_avatar","fieldType":0,"isDefault":false,"isRequired":false,"uploadType":"image","placeholder":"图像采集","acceptOption":[],"showRequired":true,"uploadAccept":".jpg,.jpeg,.gif,.png,.bmp","uploadLayout":"horizontal","validataMsgs":{"tips":"请选择图像采集8","emptyMsg":"图像采集8不能为空","errorMsg":"请选择正确的图像采集8"},"dataIndexAlia":"attachment_name","uploadBtnText":"请上图像","showUploadListType":true},{"key":"1blsblkh9","tip":"最大可上传15MB文件，请在高级设置中注明所需文件格式，以免造成不必要的麻烦。","sort":8,"title":"文件9","fieldId":10309,"imgIcon":"768;","isLogin":false,"dataType":"inputUpload","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"file_url_1500969093584","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"uploadType":"text","showRequired":false,"uploadAccept":".jpg,.jpeg,.gif","uploadLayout":"horizontal","validataMsgs":{"tips":"请选择文件9","emptyMsg":"文件9不能为空","errorMsg":"请选择正确的文件9"},"dataIndexAlia":"file_name_1500969093584","uploadBtnText":"请上文件"},{"key":"1bn87h5c2","sort":9,"title":"组织结构10","fieldId":10005,"isLogin":false,"dataType":"tree","disabled":false,"editable":true,"operaUrl":{"addDataUrl":"directory","loadDataUrl":"directory/list","removeDataUrl":"directory"},"showable":true,"validata":"^\\S+$","dataIndex":"department","fieldType":0,"isDefault":false,"isRequired":false,"searchable":{"name":"department","isDispaly":true},"operaParams":{"type":3},"showRequired":true,"validataMsgs":{"tips":"请输入组织结构10","emptyMsg":"组织结构10不能为空","errorMsg":"请输入正确的组织结构10"}},{"key":"1bl7rlar0","sort":10,"title":"职位11","fieldId":11048,"imgIcon":"611;","isLogin":false,"dataType":"select","disabled":false,"editable":true,"showable":true,"validata":"","dataIndex":"select_1500281214529","fieldType":1,"isDefault":true,"operaIcon":"748;","operaItem":[{"icon":"748;","title":"添加项目","callType":"add_form_field"},{"icon":"","title":"批量编辑","callType":"batch_add_form_field"}],"isRequired":false,"searchable":{"name":"select_1500281214529","isDispaly":true},"chlidOptions":[{"sort":1,"text":"项目经理","value":"select_item_1000000004125"},{"sort":2,"text":"产品经理","value":"select_item_1000000004126"},{"sort":3,"text":"JAVA工程师","value":"select_item_1000000004127"}],"showRequired":false,"validataMsgs":{"tips":"请选择职位11","emptyMsg":"职位11不能为空","errorMsg":"请选择正确的职位11"}},{"key":"1boubep4i","sort":11,"title":"普通文本框12","fieldId":11610,"imgIcon":"603;","isLogin":false,"dataType":"text","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"text_1504257186537","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"showRequired":false,"validataMsgs":{"tips":"请输入普通文本框12","emptyMsg":"普通文本框12不能为空","errorMsg":"请输入正确的普通文本框12"}},{"key":"1boubetm4","sort":12,"title":"多行文本框13","fieldId":11852,"imgIcon":"612;","isLogin":false,"dataType":"textarea","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"textarea_1504257200414","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"showRequired":false,"validataMsgs":{"tips":"请输入多行文本框13","emptyMsg":"多行文本框13不能为空","errorMsg":"请输入正确的多行文本框13"}},{"key":"1bnnk1j3e","tip":"请选择地址需要收集的具体项目","sort":13,"title":"地区-国家","fieldId":10206,"imgIcon":"60e;","isLogin":false,"dataType":"cascader","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"country_1502957581865","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":1,"value":"country"},"chlidOptions":[{"sort":1,"text":"国家","value":"country"},{"sort":2,"text":"国家-省","value":"country-province"},{"sort":3,"text":"国家-省-市","value":"country-province-city"},{"sort":4,"text":"省-市","value":"province-city"}],"showRequired":false,"validataMsgs":{"tips":"请输入地区-国家","emptyMsg":"地区-国家不能为空","errorMsg":"请输入正确的地区-国家"},"optionDefaultValue":"country"},{"key":"1boubfbqp","tip":"请选择地址需要收集的具体项目","sort":14,"title":"地区-国家省","fieldId":12618,"imgIcon":"60e;","isLogin":false,"dataType":"cascader","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"country_1504257216383","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":14,"value":"country-province"},"chlidOptions":[{"sort":1,"text":"国家","value":"country"},{"sort":2,"text":"国家-省","value":"country-province"},{"sort":3,"text":"国家-省-市","value":"country-province-city"},{"sort":4,"text":"省-市","value":"province-city"}],"showRequired":false,"validataMsgs":{"tips":"请输入地区-国家省","emptyMsg":"地区-国家省不能为空","errorMsg":"请输入正确的地区-国家省"},"optionDefaultValue":"country"},{"key":"1bp1f7qeg","tip":"请选择地址需要收集的具体项目","sort":15,"title":"地区-国家省市","fieldId":12343,"imgIcon":"60e;","isLogin":false,"dataType":"cascader","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"country_1504361823546","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":1,"value":"country-province-city"},"chlidOptions":[{"sort":1,"text":"国家","value":"country"},{"sort":2,"text":"国家-省","value":"country-province"},{"sort":3,"text":"国家-省-市","value":"country-province-city"},{"sort":4,"text":"省-市","value":"province-city"}],"showRequired":false,"validataMsgs":{"tips":"请输入地区-国家省市","emptyMsg":"地区-国家省市不能为空","errorMsg":"请输入正确的地区-国家省市"},"optionDefaultValue":"country"},{"key":"1bp1f81cl","tip":"请选择地址需要收集的具体项目","sort":16,"title":"地区-省市县","fieldId":12640,"imgIcon":"60e;","isLogin":false,"dataType":"cascader","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"country_1504361829972","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":2,"value":"province-city"},"chlidOptions":[{"sort":1,"text":"国家","value":"country"},{"sort":2,"text":"国家-省","value":"country-province"},{"sort":3,"text":"国家-省-市","value":"country-province-city"},{"sort":4,"text":"省-市","value":"province-city"}],"showRequired":false,"validataMsgs":{"tips":"请输入地区-省市县","emptyMsg":"地区-省市县不能为空","errorMsg":"请输入正确的地区-省市县"},"optionDefaultValue":"country"},{"key":"1bklf62a3","tip":"请选择日期需要收集的具体项目","sort":17,"title":"日期","fieldId":14337,"imgIcon":"60f;","isLogin":false,"dataType":"date","disabled":false,"editable":true,"showable":true,"validata":"","dataIndex":"date_1499664141446","fieldType":1,"isDefault":true,"loginType":"no_pwd","operaIcon":"748;","isRequired":true,"isLoginItem":false,"optionItems":{"key":"area_type_option_key","sort":21,"value":"date","format":"YYYY-MM-DD"},"chlidOptions":[{"text":"日期","value":"date","format":"YYYY-MM-DD"},{"text":"日期-时间","value":"datetime","format":"YYYY-MM-DD HH:mm:ss"},{"text":"时间","value":"time","format":"HH:mm:ss"}],"showRequired":false,"validataMsgs":{"tips":"请选择日期","emptyMsg":"","errorMsg":""},"optionDefaultValue":"date"},{"key":"1boubet4d","tip":"请选择日期需要收集的具体项目","sort":18,"title":"日期-时间","fieldId":12094,"imgIcon":"60f;","isLogin":false,"dataType":"date","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"date_1504257202187","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":9,"value":"datetime","format":"YYYY-MM-DD HH:mm:ss"},"chlidOptions":[{"text":"日期","value":"date","format":"YYYY-MM-DD"},{"text":"日期-时间","value":"datetime","format":"YYYY-MM-DD HH:mm:ss"},{"text":"时间","value":"time","format":"HH:mm:ss"}],"showRequired":false,"validataMsgs":{"tips":"请选择日期-时间","emptyMsg":"日期-时间不能为空","errorMsg":"请选择正确的日期-时间"},"optionDefaultValue":"date"},{"key":"1boubfl9m","tip":"请选择日期需要收集的具体项目","sort":19,"title":"时间","fieldId":12900,"imgIcon":"60f;","isLogin":false,"dataType":"date","disabled":false,"editable":true,"showable":true,"validata":"^\\S+$","dataIndex":"date_1504257217317","fieldType":1,"isDefault":true,"operaIcon":"748;","isRequired":false,"optionItems":{"key":"area_type_option_key","sort":12,"value":"time","format":"HH:mm:ss"},"chlidOptions":[{"text":"日期","value":"date","format":"YYYY-MM-DD"},{"text":"日期-时间","value":"datetime","format":"YYYY-MM-DD HH:mm:ss"},{"text":"时间","value":"time","format":"HH:mm:ss"}],"showRequired":false,"validataMsgs":{"tips":"请选择时间","emptyMsg":"时间不能为空","errorMsg":"请选择正确的时间"},"optionDefaultValue":"date"}];

class ProfileComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editColumns: [],
      extColumns:[],
      modifyRow:[],
      tips:'222222'
    }
  }

  componentWillMount(){
    this.setState({editColumns:testUserColnum});
  }

  /**
   *提交新增/修改
   */
  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        //console.log('Errors in form!!!');
        return;
      }
      this.saveData(values);
    });
  }

  saveData = (values)=>{

  }

  render() {
    return (
      <div className="profile-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
          rightContent={
            <span style={{fontSize: '0.28rem'}} onClick={this.handleSubmit.bind(this)}>保存</span>
          }
        >个人资料</NavBar>
        <div className="profile-content">
          <ModifyForm
            tips={this.state.tips}
            data={this.state.modifyRow}
            columns={this.state.editColumns}
            extColumns={this.state.extColumns}
            form={this.props.form}
            instance={this}/>
        </div>
      </div>
    );
  }
}

ProfileComponent.displayName = 'AccountProfileComponent';
ProfileComponent = createForm()(ProfileComponent);
// Uncomment properties you need
// ProfileComponent.propTypes = {};
// ProfileComponent.defaultProps = {};

export default ProfileComponent;
