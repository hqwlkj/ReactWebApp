'use strict';

import React from 'react';
import {NavBar, List, Badge} from 'antd-mobile';

require('styles/account/Center.less');

class CenterComponent extends React.Component {
  render() {
    return (
      <div className='center-component'>
        <NavBar
          mode='dark'
          onLeftClick={() => window.location.href = '#/'}
        >个人中心</NavBar>

        <div className='center-container'>
          <List>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon username'>&#xe636;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/profile';
              }}
            >
              个人资料
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon'>&#xe692;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/pwd';
              }}
            >
              修改密码
            </List.Item>
          </List>
          <List>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon exam'>&#xe61b;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/test/record';
              }}
            >
              考试记录
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon wrong-title'>&#xe62a;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/error/record';
              }}
              extra={<Badge text={100} overflowCount={99}/>}
            >
              错题汇总
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon message'>&#xe628;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/message';
              }}
              extra={<Badge text={77} overflowCount={50}/>}
            >
              我的消息
            </List.Item>
          </List>
          <List>
            <List.Item
              arrow='horizontal'
              thumb={<i className='carme-icon ranking'>&#xe6f1;</i>}
              multipleLine
              onClick={() => {
                window.location.href='#/account/rank';
              }}
            >
              我的排名
            </List.Item>
          </List>
        </div>

      </div>
    );
  }
}

CenterComponent.displayName = 'AccountCenterComponent';

// Uncomment properties you need
// CenterComponent.propTypes = {};
// CenterComponent.defaultProps = {};

export default CenterComponent;
