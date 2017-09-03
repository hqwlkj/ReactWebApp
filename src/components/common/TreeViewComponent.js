'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {NavBar, List} from 'antd-mobile';
import * as request from '../../utils/request';

require('styles/common/TreeView.less');

let id = 'id' + Date.now().toString(16);
let instance;

class TreeViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      initialValue: '请选择',
      data: [],
      viewTab: 1
    }
    instance = this;
    this.closeTreeViewWindow = this.closeTreeViewWindow.bind(this);
  }

  doProps(props) {
    this.props = props;
    this.loadTreeData();
  }

  loadTreeData() {
    let fetchApi = this.props.item.operaUrl.loadDataUrl;
    let params = this.props.item.operaParams;
    request.get(fetchApi, params).then((data) => {
      let treeData = this.formartListDataToTreeData(data.result) || [];
      this.setState({
        data: treeData
      });
    });
  }

  formartListDataToTreeData(list = [], parentId = 0) {
    let newArr = [];
    list.forEach((item) => {
      if (item.parentId === parentId) {
        newArr.push({
          id: item.id,
          name: item.name,
          key: `${item.id}`,
          parentId: item.parentId,
          children: this.formartListDataToTreeData(list, item.id)
        })
      }
    });
    return newArr;
  }


  componentWillReceiveProps(nextProps) {
    this.doProps(nextProps);
  }

  componentWillMount() {
    this.doProps(this.props);
  }

  closeTreeViewWindow() {
    let elem = document.querySelector('#' + id);
    elem.remove();
  }

  handleOk() {

  }


  render() {
    return (
      <div className="tree-view-component" onClick={() => {
        this.setState({viewTab: 2});
      }}>
        <NavBar onLeftClick={() => {
          this.closeTreeViewWindow()
        }
        } rightContent={
          <span style={{fontSize: '0.28rem'}} onClick={this.handleOk.bind(this)}>确认</span>
        }>{`选择${this.props.item.title}`}</NavBar>
        <div className="tree-view-container">
          <List>
            {
              (this.state.data || []).map((item) => {
                return (<List.Item key={item.id}>{item.name}</List.Item>);
              })
            }

          </List>
        </div>
      </div>
    );
  }
}

TreeViewComponent.displayName = 'CommonTreeViewComponent';

// Uncomment properties you need
// TreeViewComponent.propTypes = {};
// TreeViewComponent.defaultProps = {};

export default {
  show: (callback, form, item) => {
    let elem = document.querySelector('#' + id);
    if (!elem) {
      let elem = document.createElement('div');
      elem.setAttribute('id', id);
      document.querySelector('#app').appendChild(elem);
      ReactDOM.render(<TreeViewComponent form={form} item={item} onLogin={callback}/>, document.getElementById(id));
    }
    if (!!instance) {
      instance.setState({visible: true});
    }
  },
  hide: () => {
    if (!!instance) {
      instance.closeTreeViewWindow();
    }
  }
}
