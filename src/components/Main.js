require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (<div>{this.props.children}</div>);
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
