'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {RefreshControl, ListView, List, Icon, Flex} from 'antd-mobile';
import Circle from '../common/CircleComponent';

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

require('styles/public/Test.less');

class TestComponent extends React.Component {
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

  /**
   * 跳转到试卷页面
   * @param id 时间ID
   * @param time 考试总时间 （分）
   */
  goToPaper(id,time){
    window.location.href = '#/paper/3/'+id+'/'+time+'/0'
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
      return (
        <List className='test-list' key={rowID}>
          <List.Item
            data-seed='logId'
            arrow='horizontal'
            multipleLine
            onClick={()=>{this.goToPaper(1,1);}}
          ><div className='test-title'>日常任务日常任务日常任务日常任务日常任务日常任务日常任务日常任务——{rowID}</div>
            <List.Item.Brief>开始日期：<span>2017年08月01日</span></List.Item.Brief>
            <List.Item.Brief>结束日期：<span>2017年08月31日</span></List.Item.Brief>
            <List.Item.Brief>答题时段：<span>00:00:00-23:59:59</span></List.Item.Brief>
            <List.Item.Brief>考试时间：<span>10</span>分钟</List.Item.Brief>
            <List.Item.Brief>题目数量：<span>10</span>题</List.Item.Brief>
          </List.Item>
        </List>
      );
    };

    return (
      <div className='test-component'>
        <div className='test-header'>
          <Flex>
            <Flex.Item>
              <div className='test-pie-chart'>
                <Circle width={220} items={[
                  {value: 0.9, color: '#af7ccc', bgColor: '#70dac5', text: '完成率', textColor: '#ffffff'}
                ]}>
                </Circle>
              </div>
            </Flex.Item>
            <Flex.Item className='test-info-box'>
              <p>今日考试数：<span>15</span></p>
              <p>已参加考试：<span>5</span></p>
            </Flex.Item>
          </Flex>
        </div>
        <div className='test-body'>
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

TestComponent.displayName = 'PublicTestComponent';

// Uncomment properties you need
// TestComponent.propTypes = {};
// TestComponent.defaultProps = {};

export default TestComponent;
