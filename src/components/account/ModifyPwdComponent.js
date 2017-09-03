'use strict';

import React from 'react';
import {NavBar, List, InputItem, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import Config from 'config';

require('styles/account/ModifyPwd.less');

class ModifyPwdComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
  }

  validatePassWord = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (value && value.length >= 6 && value.length <= 30) {
      if(Config.validateRules.weakPwd(value)){
        callback(new Error('密码强度太弱了，请重新输入！'));
        return;
      }
      if (value && value !== getFieldValue('newPwd')) {
        callback(new Error('您两次输入的密码不一致！'));
        return;
      } else if(Config.validateRules.weakPwd(value)){
        callback(new Error('新密码太弱了，请重新输入！'));
        return;
      }
      callback();
    } else {
      callback();
    }
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    return (
      <div className="modify-pwd-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
          rightContent={
            <span style={{fontSize: '0.28rem'}} onClick={()=>{
              console.log('调用修改密码的方法');
            }}>保存</span>
          }
        >修改密码</NavBar>
        <List className="modify-pwd-container">
          <InputItem
            {...getFieldProps('oldPwd', {
              rules: [
                { required: true,  pattern: /\S{6,30}/, message: '请输入一个长度范围在6~30位之间的密码',type: 'string'},
                {validator: this.validatePassWord}
              ],
            })}
            clear
            error={!!getFieldError('oldPwd')}
            onErrorClick={() => {
              Toast.info(getFieldError('oldPwd').join('、'),3);
            }}
            placeholder="请输入原密码"
            type="password"
          >原密码</InputItem>
          <InputItem {...getFieldProps('newPwd', {
            rules: [
              { required: true,  pattern: /\S{6,30}/, message: '请输入一个长度范围在6~30位之间的密码',type: 'string'},
              {validator: this.validatePassWord}
            ]
          })} clear error={!!getFieldError('newPwd')}
                     onErrorClick={() => {
                       Toast.info(getFieldError('newPwd').join('、'),3);
                     }} placeholder="请输入新密码" type="password">
            新密码
          </InputItem>
          <InputItem {...getFieldProps('newPwd2', {
            rules: [
              {required: true, message: '请输入确认新密码'},
              {validator: this.validatePassWord}
            ]
          })} clear error={!!getFieldError('newPwd2')}
                     onErrorClick={() => {
                       Toast.info(getFieldError('newPwd2').join('、'),3);
                     }}
                     placeholder="请输入确认新密码" type="password">
            确认新密码
          </InputItem>
        </List>
      </div>
    );
  }
}

ModifyPwdComponent.displayName = 'AccountModifyPwdComponent';
ModifyPwdComponent = createForm()(ModifyPwdComponent);
// Uncomment properties you need
// ModifyPwdComponent.propTypes = {};
// ModifyPwdComponent.defaultProps = {};

export default ModifyPwdComponent;
