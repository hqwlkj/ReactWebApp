'use strict';

import React from 'react';
import {Card} from 'antd-mobile';

require('styles/home/IndexLevel.less');

class IndexLevelComponent extends React.Component {
  render() {
    return (
      <div className='indexlevel-component'>
        <Card full>
          <Card.Header
            title='关卡'
            extra={<i className='carme-icon' onClick={() => {
              console.log('关卡,查看更多', this.props.instance);
              this.props.onSelectedTab('levelTab');
            }}>&#xe62e;</i>}
          />
          <Card.Body>
            <div className='body-title'><i className='carme-icon'>&#xe61f;</i> <span>当前关卡</span></div>
            <div className='daily-list'>
              <div className='daily-item' onClick={() => console.log('点击我，要将状态修改一下哦，并且需要跳转到关卡的详情页面')}>
                <div className='daily-content'>关卡二：知否知否，应是绿肥红瘦</div>
                <div className='right-arrow'><i className='carme-icon'>&#xe62e;</i></div>
                <div className='state'>未进行</div>
              </div>
              <div className='daily-item' onClick={() => console.log('点击我，要将状态修改一下哦，并且需要跳转到关卡的详情页面')}>
                <div className='daily-content'>关卡三：知否知否，应是绿肥红瘦</div>
                <div className='right-arrow'><i className='carme-icon'>&#xe62e;</i></div>
                <div className='state'>未进行</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

IndexLevelComponent.displayName = 'HomeIndexLevelComponent';

// Uncomment properties you need
// IndexLevelComponent.propTypes = {};
// IndexLevelComponent.defaultProps = {};

export default IndexLevelComponent;
