'use strict';

import React from 'react';
import {NavBar, Flex} from 'antd-mobile';
import Config from 'config';

require('styles/public/CourseDetails.less');

class CourseDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarTitle: '在线学习',
      params: {},
      visible: false,
      selected: ''
    }
  }

  componentWillMount() {
    console.log(this.props.params);
    this.setState({params: this.props.params});
  }

  goBackOff() {
    window.history.go(-1);
  }

  /**
   * 跳转到试卷页面
   * @param id 数据Id
   */
  goToPaper(id){
    window.location.href = '#/paper/4/'+id+'/0/0';
  }

  downloadAttachments(key){
    // window.open(Config.QINIU_URL+key); //正式的时候 开启
    window.open('http://ov67wohsp.bkt.clouddn.com/guide1.jpeg');
  }



  render() {
    let offsetX = -10; // just for pc demo
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }
    return (
      <div className="course-details-component">
        <NavBar onLeftClick={() => {
          this.goBackOff()
        }} rightContent={[
          <i className="carme-icon" key="0" style={{ marginRight: '0.32rem' }} onClick={()=>{
            this.downloadAttachments();
          }}>&#xe630;</i>,
          <i className="carme-icon" key="1" onClick={()=>{this.goToPaper(this.state.params.id)}}>&#xe600;</i>
        ]}>{this.state.navbarTitle}</NavBar>
        <div className="course-details-container">
          <h3>这里是课程标题这里是课程标题这里是课程标题这里是课程标题这里是课程标题这里是课程标题</h3>
          <div className="course-details-info">
            <p className='classify'>课程分类：<span>一级分类</span>/<span>二级分类</span></p>
            <p className='time'>创建时间：<span>2017-08-19 12:00</span></p>
          </div>
          <div className="course-details-content">
            <p style={{textAlign:'center'}}><iframe src="https://v.qq.com/iframe/player.html?vid=r0524ll66ms&tiny=0&amp;auto=0" allowFullScreen="" width="640" height="498" frameBorder="0">&lt;br&gt;</iframe></p><p>必须要有文字才能保存成功！<br/></p>
            <p><img src="http://ojiowy5mw.bkt.clouddn.com/Fq-Et3CQGwQWQKtjnj7XU3oa2gqf" /><img src="http://ojiowy5mw.bkt.clouddn.com/FsFEt0zc0V9faFgjdq1zJIVN4oHF" /></p>
          </div>
        </div>
      </div>
    );
  }
}

CourseDetailsComponent.displayName = 'PublicCourseDetailsComponent';

// Uncomment properties you need
// CourseDetailsComponent.propTypes = {};
// CourseDetailsComponent.defaultProps = {};

export default CourseDetailsComponent;
