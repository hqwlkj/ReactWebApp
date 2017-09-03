'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {RefreshControl, ListView, Accordion, Icon,Flex} from 'antd-mobile';
import Circle from '../common/CircleComponent';

require('styles/public/Course.less');

const dpr = typeof window !== 'undefined' && window.devicePixelRatio || 2;

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '一级分类名称',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '一级分类名称',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '一级分类名称',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
let index = data.length - 1;

let pageIndex = 0;

class CourseComponent extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.initData = [];
    for (let i = 0; i < 20; i++) {
      this.initData.push(`r${i}`);
    }
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      height: document.documentElement.clientHeight
    };
  }

  componentDidMount() {
    this.manuallyRefresh = true;
    setTimeout(() => this.setState({refreshing: true}), 10);

    // Set the appropriate height
    setTimeout(() => this.setState({
      height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
    }), 0);

    // handle https://github.com/ant-design/ant-design-mobile/issues/1588
    this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        console.log('start pull to refresh');
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
  }

  componentWillUnmount() {
    this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
  }

  onScroll = (e) => {
    this.st = e.scroller.getValues().top;
    this.domScroller = e;
  }

  onRefresh = () => {
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({refreshing: true});
    } else {
      this.manuallyRefresh = false;
    }
    setTimeout(() => {
      this.initData = [`ref${pageIndex++}`, ...this.initData];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false
      });
    }, 1000);
  }

  onChange = (key) => {
    console.log(key);
  }

  goToCourseDetails(id){
    window.location.href = '#/course/details/'+id;
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 20
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <Accordion defaultActiveKey='0' accordion openAnimation={{}} className='my-accordion' onChange={this.onChange}
                   key={rowID}>
          <Accordion.Panel header={obj.title} key={rowID}>
            <div className='search-content'>
              <ul>
                <li>二级分类1</li>
                <li className='cur'>二级分类2</li>
                <li className='cur'>二级分类3</li>
                <li className='cur'>二级分类4</li>
              </ul>
            </div>
            <div className='course-list'>
              <div className='course-item clearfix' onClick={()=>{this.goToCourseDetails(1);}}>
                <div className='course-title'>第一课：知否知否，应是绿肥红瘦</div>
                <div className='course-score'>90 <span className='unit'>分</span></div>
                <div className='course-state'>已学习</div>
              </div>
              <div className='course-item clearfix' onClick={()=>{this.goToCourseDetails(2);}}>
                <div className='course-title'>第二课：知否知否，应是绿肥红瘦</div>
                <div className='course-score'>90 <span className='unit'>分</span></div>
                <div className='course-state'>已学习</div>
              </div>
              <div className='course-item clearfix' onClick={()=>{this.goToCourseDetails(3);}}>
                <div className='course-title'>第三课：知否知否，应是绿肥红瘦</div>
                <div className='course-score'></div>
                <div className='course-state unread'>未学习</div>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion>
      );
    };

    return (
      <div className='course-component'>
        <div className='course-header'>
          <Flex>
            <Flex.Item>
              <div className='course-pie-chart'>
                <Circle width={220} items={[
                  {value: 0.9, color: '#af7ccc', bgColor: '#70dac5', text: '进度', textColor:'#ffffff'}
                ]}>
                </Circle>
              </div>
            </Flex.Item>
            <Flex.Item className='course-info-box'>
              <p>已学习课程数：<span>3</span></p>
              <p>未学习课程数：<span>15</span></p>
            </Flex.Item>
          </Flex>
        </div>
        <div className='course-body'>
          <ListView
            ref='lv'
            dataSource={this.state.dataSource}
            renderRow={row}
            renderSeparator={separator}
            initialListSize={5}
            pageSize={5}
            scrollRenderAheadDistance={200}
            scrollEventThrottle={20}
            style={{height: (this.state.height - 100)}}
            scrollerOptions={{scrollbars: true}}
            refreshControl={<RefreshControl
              icon={[
                <div key='0' className='am-refresh-control-pull'>
                  <span>下拉刷新</span>
                </div>,
                <div key='1' className='am-refresh-control-release'>
                  <span>释放即可刷新</span>
                </div>
              ]}
              loading={<span><Icon type='loading' size='xs'/><span className='loading-txt'>刷新中...</span></span>}
              distanceToRefresh={100 / 2 * dpr}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
            onScroll={this.onScroll}
          />
        </div>
      </div>
    );
  }
}

CourseComponent.displayName = 'PublicCourseComponent';

// Uncomment properties you need
// CourseComponent.propTypes = {};
// CourseComponent.defaultProps = {};

export default CourseComponent;
