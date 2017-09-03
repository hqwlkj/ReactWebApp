'use strict';

import React from 'react';
import {NavBar} from 'antd-mobile';

require('styles/public/ErrorRecord.less');

class ErrorRecordComponent extends React.Component {
  render() {
    return (
      <div className="errorrecord-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
        >错题汇总</NavBar>
      </div>
    );
  }
}

ErrorRecordComponent.displayName = 'PublicErrorRecordComponent';

// Uncomment properties you need
// ErrorRecordComponent.propTypes = {};
// ErrorRecordComponent.defaultProps = {};

export default ErrorRecordComponent;
