'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import {RefreshControl, ListView, Accordion, Icon} from 'antd-mobile';

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

require('styles/public/Level.less');

class LevelComponent extends React.Component {
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

  /**
   * 跳转到试卷页面
   * @param id 数据Id
   */
  goToPaper(id){
    window.location.href = '#/paper/2/'+id+'/0/0'
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
      let cur = Math.floor(Math.random()*9+1); //生成1~9的随机数
      return (
        <Accordion defaultActiveKey='0' accordion openAnimation={{}} className='my-accordion' onChange={this.onChange}
                   key={rowID}>
          <Accordion.Panel header={obj.title} key={rowID}>
            <div className='progressbar-content'>
              <ul>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className='cur'></li>
                <li className={ `cur car-${cur}`}></li>
                <li className=""></li>
                <li>进度 <span>8{cur}</span>%</li>
              </ul>
            </div>
            <div className='level-list'>
              <div className='level-item clearfix' onClick={()=>{this.goToPaper(1);}}>
                <div className='level-title'>闯关1：知否知否，应是绿肥红瘦</div>
                <div className='level-state'><i className='carme-icon'>&#xe62f;</i></div>
              </div>
              <div className='level-item clearfix' onClick={()=>{this.goToPaper(2);}}>
                <div className='level-title'>闯关2：知否知否，应是绿肥红瘦</div>
                <div className='level-state'><i className='carme-icon'>&#xe62f;</i></div>
              </div>
              <div className='level-item clearfix' onClick={()=>{this.goToPaper(3);}}>
                <div className='level-title'>闯关3：知否知否，应是绿肥红瘦</div>
                <div className='level-state unread'><i className='carme-icon'>&#xe660;</i></div>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion>
      );
    };



    return (
      <div className='level-component'>
        <div className='user-info'>
          <span>姓名：</span><span>西同学</span>
        </div>
        <div className='level-body'>
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

LevelComponent.displayName = 'PublicLevelComponent';

// Uncomment properties you need
// LevelComponent.propTypes = {};
// LevelComponent.defaultProps = {};

export default LevelComponent;
