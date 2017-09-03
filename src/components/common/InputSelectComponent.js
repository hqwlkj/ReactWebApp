'use strict';

import React from 'react';
import {Popup, List, Checkbox, Button, Icon} from 'antd-mobile';

require('styles/common/InputSelect.less');

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class InputSelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: '',
      showTest: '请选择',
      data: []
    }
    this.initialPopupValue = this.initialPopupValue.bind(this);
  }

  componentWillMount() {
    // let tips = this.props.item.validataMsgs.tips;
    // this.setState({
    //   showTest:tips
    // });
    let texts = this.initialPopupValue();
    this.setState({showTest: texts.join(',')});
  }

  renderHeader = () => (
    <div style={{position: 'relative'}}>
      {this.props.item.validataMsgs.tips || ''}
      <span style={{position: 'absolute', right: 3, top: -5}}
            onClick={() => this.onClose('cancel')}
      >
        <Icon type="cross"/>
      </span>
    </div>
  );

  onChange(e, value) {
    const {getFieldValue, setFieldsValue} = this.props.form;
    let dataIndex = this.props.item.dataIndex;
    let data = getFieldValue(dataIndex);
    if (e.target.checked) {
      data.push(value);
    } else {
      data = ( data || []).filter(x => x !== value);
    }
    setFieldsValue({[dataIndex]: data});
    this.setState({data: data})
  }

  handleChecked(value) {
    let dataIndex = this.props.item.dataIndex;
    let data = this.props.form.getFieldValue(dataIndex);
    return (data || []).filter(x => x === value).length === 1;
  }


  onClick = () => {
    Popup.show(<div className="input-select-popup">
      <List renderHeader={this.renderHeader} className="popup-list">
        {(this.props.item.chlidOptions || []).map((i, index) => (
          <Checkbox.CheckboxItem key={i.value} defaultChecked={this.handleChecked(i.value)}
                                 onChange={(e) => this.onChange(e, i.value)}>
            {i.label}
          </Checkbox.CheckboxItem>
        ))}
      </List>
      <ul style={{padding: '0.18rem 0.3rem', listStyle: 'none'}}>
        <li style={{marginTop: '0.18rem'}}>
          <Button type="primary" onClick={() => this.handleOK('cancel')}>确定</Button>
        </li>
      </ul>
    </div>, {animationType: 'slide-up', maskProps, maskClosable: false});
  };

  onClose = (sel) => {
    this.setState({sel});
    Popup.hide();
  };

  handleOK = (sel)=>{
    let texts = this.initialPopupValue();
    this.setState({sel, showTest: texts.join(',')});
    Popup.hide();
  }

  initialPopupValue(){
    let dataIndex = this.props.item.dataIndex;
    let values = this.props.form.getFieldValue(dataIndex);
    return (values || []).map((value) => {
      return (this.props.item.chlidOptions || []).filter(x => x.value === value)[0].label;
    });
  }

  render() {
    return (
      <div className="input-select-component" onClick={() => this.onClick()}>
        {this.state.showTest}
      </div>
    );
  }
}

InputSelectComponent.displayName = 'CommonInputSelectComponent';

// Uncomment properties you need
// InputSelectComponent.propTypes = {};
// InputSelectComponent.defaultProps = {};

export default InputSelectComponent;
