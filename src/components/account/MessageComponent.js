'use strict';

import React from 'react';
import {NavBar} from 'antd-mobile';

require('styles/account/Message.less');

class MessageComponent extends React.Component {
  render() {
    return (
      <div className="message-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
        >我的消息</NavBar>
      </div>
    );
  }
}

MessageComponent.displayName = 'AccountMessageComponent';

// Uncomment properties you need
// MessageComponent.propTypes = {};
// MessageComponent.defaultProps = {};

export default MessageComponent;
