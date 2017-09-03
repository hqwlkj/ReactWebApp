'use strict';

import React from 'react';
import {NavBar} from 'antd-mobile';

require('styles/public/TestRecord.less');

class TestRecordComponent extends React.Component {
  render() {
    return (
      <div className="testrecord-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
        >考试记录</NavBar>
      </div>
    );
  }
}

TestRecordComponent.displayName = 'PublicTestRecordComponent';

// Uncomment properties you need
// TestRecordComponent.propTypes = {};
// TestRecordComponent.defaultProps = {};

export default TestRecordComponent;
