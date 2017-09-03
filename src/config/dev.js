'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  host:'http://carmegate.parsec.com.cn/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
