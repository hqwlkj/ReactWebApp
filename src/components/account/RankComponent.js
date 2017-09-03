'use strict';

import React from 'react';
import {NavBar} from 'antd-mobile';

require('styles/account/Rank.less');

class RankComponent extends React.Component {
  render() {
    return (
      <div className="rank-component">
        <NavBar
          mode="dark"
          onLeftClick={() => window.location.href = '#/account'}
        >我的排行</NavBar>
      </div>
    );
  }
}

RankComponent.displayName = 'AccountRankComponent';

// Uncomment properties you need
// RankComponent.propTypes = {};
// RankComponent.defaultProps = {};

export default RankComponent;
