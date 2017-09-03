import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import SS from 'parsec-ss';
import Config from 'config';

//权限验证(是否登录)
const handleAuth = function (nextState, replace) {
  if (SS.get(Config.USER_TOKEN) == null) {
    //如果没有登录，重定向到登录页
    // replace({pathname: 'login'});
  }
}


const rootRoute = {
  childRoutes: [
    {
      path: 'login', getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/LoginComponent').default)
      });
    }
    },
    {
      path: '/',
      breadcrumbName: '首页',
      onEnter: handleAuth,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Main').default)
        });
      },
      indexRoute: {
        breadcrumbName: '首页',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/IndexComponent').default)
          }); //dashboard
        }
      },
      childRoutes: [
        {path: '/tree/view', breadcrumbName: '树形结构视图', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/common/TreeViewComponent').default)});}},
        {path: '/account', breadcrumbName: '个人中心', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/account/CenterComponent').default)});}},
        {path: '/account/profile', breadcrumbName: '个人资料', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/account/ProfileComponent').default)});}},
        {path: '/account/pwd', breadcrumbName: '修改密码', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/account/ModifyPwdComponent').default)});}},
        {path: '/account/test/record', breadcrumbName: '修改密码', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/public/TestRecordComponent').default)});}},
        {path: '/account/error/record', breadcrumbName: '错题汇总', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/public/ErrorRecordComponent').default)});}},
        {path: '/account/message', breadcrumbName: '我的消息', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/account/MessageComponent').default)});}},
        {path: '/account/rank', breadcrumbName: '我的排名', getComponent(nextState, cb) {require.ensure([], (require) => {cb(null, require('./components/account/RankComponent').default)});}},

        {path: '/paper/:type/:id/:time/:subcateId', breadcrumbName:'试卷',getComponent(nextState,cb){ require.ensure([],(require)=>{cb(null,require('./components/public/TestPaperComponent').default)});}},
        {path: '/course/details/:id', breadcrumbName:'课程详情',getComponent(nextState,cb){ require.ensure([],(require)=>{cb(null,require('./components/public/CourseDetailsComponent').default)});}}
      ]
    }
  ]
}

// Render the main component into the dom
ReactDOM.render(<Router history={hashHistory} routes={rootRoute}/>, document.getElementById('app'));
