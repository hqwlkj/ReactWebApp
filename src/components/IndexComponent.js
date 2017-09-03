'use strict';

import React from 'react';
import {NavBar,TabBar} from 'antd-mobile';
import indexIcon from 'images/index-icon.png';
import indexIconUn from 'images/index-icon-un.png';
import SS from 'parsec-ss';
import Home from './home/IndexComponent';
import Course from './public/CourseComponent';
import Level from './public/LevelComponent';
import Test from './public/TestComponent';
import Daily from './public/DailyComponent';

require('styles//Index.less');

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'indexTab',
      hidden: false
    };
  }

  componentWillMount(){
    let selectedTab = SS.get('selectedTab');
    if(!!selectedTab){
      this.handleSelectedTab(selectedTab);
    }
  }

  getContainerPage(){
    let content = null;
    switch (this.state.selectedTab){
      case 'indexTab':
        content = <Home instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
      case 'courseTab':
        content = <Course instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
      case 'dailyTab':
        content = <Daily instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
      case 'levelTab':
        content = <Level instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
      case 'testTab':
        content = <Test instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
      default:
        content = <Home instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>;
        break;
    }
    return content;
  }


  handleSelectedTab(tab){
    this.setState({
      selectedTab:tab
    },()=>{SS.set('selectedTab',tab)})
  }

  renderContent(pageText) {
    return (
      <div className='app-container'>
        <NavBar key='NavBar' iconName={null} rightContent={
          <i className='carme-icon' onClick={()=>{
            window.location.href = '#/account';
          }}>&#xe62c;</i>
        }>知否</NavBar>
        {this.getContainerPage()}
      </div>
    );
  }

  render() {
    return (
      <TabBar
        unselectedTintColor='rgba(71, 71, 71, 0.7)'
        tintColor='#55cdb5'
        barTintColor='white'
        style={{borderTop:'1px solid #55cdb5'}}
        hidden={this.state.hidden}
      >
        <TabBar.Item
          icon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
          }}>&#xe629;</i>}
          selectedIcon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
            color:'#55cdb5'
          }}>&#xe629;</i>}
          title='课程'
          key='课程'
          selected={this.state.selectedTab === 'courseTab'}
          onPress={() => {
            this.handleSelectedTab('courseTab');
          }}
          data-seed='logId'
        >
          {this.renderContent('课程')}
        </TabBar.Item>
        <TabBar.Item
          icon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
          }}>&#xe63b;</i>}
          selectedIcon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
            color:'#55cdb5'
          }}>&#xe63b;</i>}
          title='日常'
          key='日常'
          selected={this.state.selectedTab === 'dailyTab'}
          onPress={() => {
            this.handleSelectedTab('dailyTab');
          }}
          data-seed='logId1'
        >
          {this.renderContent('日常')}
        </TabBar.Item>
        <TabBar.Item
          icon={<div style={{
            position: 'absolute',
            top:'-.5rem',
            width:'1.44rem',
            height: '1.44rem',
            background: 'url('+indexIconUn+') center center /  1.42rem 1.42rem no-repeat'
            }}/>}
          selectedIcon={<div style={{
            position: 'absolute',
            top:'-.5rem',
            width:'1.44rem',
            height: '1.44rem',
            background: 'url('+indexIcon+') center center /  1.42rem 1.42rem no-repeat'
          }}/>}
          title=""
          key='首页'
          selected={this.state.selectedTab === 'indexTab'}
          onPress={() => {
            this.handleSelectedTab('indexTab');
          }}
        >
          {this.renderContent('关卡')}
        </TabBar.Item>
        <TabBar.Item
          icon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
          }}>&#xe61f;</i>}
          selectedIcon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
            color:'#55cdb5'
          }}>&#xe61f;</i>}
          title='关卡'
          key='关卡'
          selected={this.state.selectedTab === 'levelTab'}
          onPress={() => {
            this.handleSelectedTab('levelTab');
          }}
        >
          {this.renderContent('关卡')}
        </TabBar.Item>
        <TabBar.Item
          icon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
          }}>&#xe677;</i>}
          selectedIcon={<i className='carme-icon' style={{
            width:'0.44rem',
            height: '0.44rem',
            color:'#55cdb5'
          }}>&#xe677;</i>}
          title='考试'
          key='考试'
          selected={this.state.selectedTab === 'testTab'}
          onPress={() => {
            this.handleSelectedTab('testTab');
          }}
        >
          {this.renderContent('考试')}
        </TabBar.Item>
      </TabBar>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
