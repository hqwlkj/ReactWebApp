'use strict';

import React from 'react';
import {Card} from 'antd-mobile';

require('styles/home/IndexTest.less');

class IndexTestComponent extends React.Component {
  render() {
    return (
      <div className='indextest-component'>
        <Card full>
          <Card.Header
            title='考试'
            extra={<i className='carme-icon' onClick={() => {
              console.log('考试,查看更多', this.props.instance);
              this.props.onSelectedTab('testTab');
            }}>&#xe62e;</i>}
          />
          <Card.Body>
            <div className='body-title'><i className='carme-icon'>&#xe627;</i> <span>当前考试</span></div>
            <div className='test-list'>
              <div className='test-item' onClick={() => console.log('点击我，要将状态修改一下哦，并且需要跳转到考试的详情页面')}>
                <div className='test-content'>考试：知否知否，应是绿肥红瘦</div>
                <div className='test-time'>20:00进入</div>
                <div className='right-arrow'><i className='carme-icon'>&#xe62e;</i></div>
              </div>
              <div className='test-item' onClick={() => console.log('点击我，要将状态修改一下哦，并且需要跳转到考试的详情页面')}>
                <div className='test-content'>考试：知否知否，应是绿肥红瘦，应是绿肥红瘦，应是绿肥红瘦</div>
                <div className='test-time'>21:00进入</div>
                <div className='right-arrow'><i className='carme-icon'>&#xe62e;</i></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

IndexTestComponent.displayName = 'HomeIndexTestComponent';

// Uncomment properties you need
// IndexTestComponent.propTypes = {};
// IndexTestComponent.defaultProps = {};

export default IndexTestComponent;
