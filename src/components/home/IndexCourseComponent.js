'use strict';

import React from 'react';
import {Card, Steps} from 'antd-mobile';

require('styles/home/IndexCourse.less');

class IndexCourseComponent extends React.Component {

  render() {
    return (
      <div className='indexcourse-component'>
        <Card full>
          <Card.Header
            title='学习'
            extra={<i className='carme-icon' onClick={()=>{
              console.log('学习,查看更多',this.props.instance);
              this.props.onSelectedTab('courseTab');
            }}>&#xe62e;</i>}
          />
          <Card.Body>
            <Steps size='small'>
              <Steps.Step title='智能推荐'
                          status='wait'
                          icon={<i className='carme-icon' style={{fontsize:'32px'}}>&#xe72c;</i>} />
              <Steps.Step title='第二步' status='wait'
                          description = {<div className='step-list'>
                            <div className='step-item'><i className='carme-icon'>&#xe63e;</i><div className='course-name'>课程五：知否知否，应是绿肥红瘦</div></div>
                            <div className='step-item'><i className='carme-icon'>&#xe63e;</i><div className='course-name'>课程四：知否知否，应是绿肥红瘦,应是绿肥红瘦,应是绿肥红瘦</div></div>
                          </div>}
                          icon={<i className='carme-icon'>&#xe666;</i>} />
              <Steps.Step title='第三步' status='wait'
                          description = {<div className='step-list'>
                            <div className='step-item'><i className='carme-icon'>&#xe63e;</i><div className='course-name'>课程五：知否知否，应是绿肥红瘦</div></div>
                          </div>}
                          icon={<i className='carme-icon'>&#xe666;</i>} />
              <Steps.Step title="" icon={<div>&nbsp;</div>}/>
            </Steps>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

IndexCourseComponent.displayName = 'HomeIndexCourseComponent';

// Uncomment properties you need
// IndexCourseComponent.propTypes = {};
// IndexCourseComponent.defaultProps = {};

export default IndexCourseComponent;
