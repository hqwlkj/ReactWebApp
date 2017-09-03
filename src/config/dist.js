'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  host:'http://119.29.178.92:20000/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
