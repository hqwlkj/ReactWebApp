'use strict';

import React from 'react';
import {Toast} from 'antd-mobile';
import Course from './IndexCourseComponent';
import Daily from './IndexDailyComponent';
import Level from './IndexLevelComponent';
import Test from './IndexTestComponent';

require('styles/home/Index.less');

class IndexComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleSelectedTab = this.handleSelectedTab.bind(this);
  }

  componentWillMount(){
    // Toast.loading('加载中...', 3, () => {
    //   console.log('Load complete !!!');
    // });
  }

  handleSelectedTab(tab){
    this.props.onSelectedTab(tab);
  }

  getContentPage(){
    return(
      <div>
        <Course instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>
        <Daily instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>
        <Level instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>
        <Test instance={this} onSelectedTab={this.handleSelectedTab.bind(this)}/>
      </div>
    );
  }

  render() {
    return (
      <div className='index-component'>
        <div className='user-info'>
          <span>姓名：</span><span>西同学</span>
        </div>
        {this.getContentPage()}
      </div>
    );
  }
}

IndexComponent.displayName = 'HomeIndexComponent';

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;
