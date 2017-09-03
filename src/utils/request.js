require('es6-promise').polyfill();
import _ from 'lodash';
import Config from 'config';
import axios from 'axios';
import storage from 'parsec-ss';

const timeout = 15000;

function filterJSON(response) {
  try {
    return response.data;
  }
  catch (e) {
    throw new Error('data format error');
  }
}

function filterStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做一些事情
  let headers = config.headers;
  if (!(config.url.indexOf('/public/') > -1) && !(config.url.indexOf('/area/') > -1) && !(config.url.indexOf('/piccapt') > -1)) {
    headers['token'] = storage.get(Config.USER_TOKEN) === null ? 'eyJhbGciOiJIUzUxMiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAKtWyiwuVrJSSk4syk1V0lFKLE0B8gwNgczi0iQQE8hKrShQsjI0NTAxNje3NDCpBQBXkyoONQAAAA.d7kc-sToeUYyCwWsTQLQU21Rjdaw-50drcVTgUt3L5JVqyTQWK8OXCQ99OstBhJQ8cpdrcTEOmuqH7zc1xtqFA' : storage.get(Config.USER_TOKEN);
    headers['tokenId'] = storage.get(Config.USER_ID) === null ? '11' : storage.get(Config.USER_ID);
  }else{
    delete headers['token'];
    delete headers['tokenId'];
    if (!headers['Content-type']) {
      headers['Content-type'] = 'application/json; charset=UTF-8';
    }
  }
  config.headers = headers;
  return config;
}, error => {
  // 做一些请求错误
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 做一些响应数据
  let token = (response.headers || {}).token;
  if (token != undefined && token.length > 0) {
    storage.set(Config.USER_TOKEN, token); //更新token
  }
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        storage.remove(Config.USER_TOKEN);
        storage.set(Config.LOGINOUT_MSG, '登录信息已过期，请重新登录');
        window.location.href = '#/login';
    }
  }
  // 做一些响应错误的事情
  return Promise.reject(error);
});


export function request(url, type = 'GET', headers = {}, data = '') {
  let AxiosRequestConfig = {
    url: '',
    method: type,
    //baseURL: Config.host,
    headers: headers,
    params: {},
    data: {},
    timeout: timeout
  };
  if (!_.startsWith(url, 'http')) {
    url = Config.host + url;
  }

  if (type === 'POST') {
    AxiosRequestConfig.data = data;
  }

  if (type === 'GET' || type === 'DELETE') {
    let str = '';
    for (let key in data) {
      if (data[key] === '')
        continue;
      str += `${key}=${data[key]}&`
    }

    if (str != '' && !_.startsWith(url, '?')) {
      url += '?' + str;
    } else {
      url += '&' + str;
    }
    url = url.substring(0, url.length - 1);
    AxiosRequestConfig.params = {};
  }

  AxiosRequestConfig.url = url;
  return axios(AxiosRequestConfig)
    .then(filterStatus)
    .then(filterJSON)
    .catch((error) => {
      throw error;
    });
}

export function get(uri, data = '', headers = {}) {
  return request(uri, 'GET', headers, data);
}

export function post(uri, data = '', headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  }
  return request(uri, 'POST', headers, data);
}

export function remove(uri, data = '', headers = {}) {
  return request(uri, 'DELETE', headers, data);
}
