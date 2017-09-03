'use strict';

import React from 'react';
import {Card, Steps} from 'antd-mobile';

require('styles/home/IndexDaily.less');

class IndexDailyComponent extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='indexdaily-component'>
        <Card full>
          <Card.Header
            title='日常'
            extra={<i className='carme-icon' onClick={()=>{
              console.log('日常,查看更多',this.props.instance);
              this.props.onSelectedTab('dailyTab');
            }}>&#xe62e;</i>}
          />
          <Card.Body>
            <div className='body-title'><i className='carme-icon'>&#xe6c7;</i> <span>当前学习</span></div>
            <div className='daily-list'>
              <div className='daily-item' onClick={()=>console.log('点击我，要将状态修改一下哦，并且需要跳转到日常的详情页面')}>
                <div className='daily-content'>练习：知否知否，应是绿肥红瘦</div>
                <div className='right-arrow'><i className='carme-icon'>&#xe62e;</i></div>
                <div className='state'>未进行</div>
              </div>
              <div className='daily-item' onClick={()=>console.log('点击我，要将状态修改一下哦，并且需要跳转到日常的详情页面')}>
                <div className='daily-content'>练习：知否知否，应是绿肥红瘦</div>
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

IndexDailyComponent.displayName = 'HomeIndexDailyComponent';

// Uncomment properties you need
// IndexDailyComponent.propTypes = {};
// IndexDailyComponent.defaultProps = {};

export default IndexDailyComponent;
