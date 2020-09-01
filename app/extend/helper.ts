import { request } from '../utils/http';
import fs = require('fs');
import { find } from 'lodash';

module.exports = {

  async mallRequest({
    method, url, data, serviceType, header,
  }) {

    console.log('11111111');
    const serviceData = find(this.app.config.serverHost, v => v.type === serviceType);

    const serviceHost = serviceData.name;
    const newHeader = Object.assign({
      Source: 'h5',
    }, header || {});

    console.log(serviceHost + url);
    return request({
      method,
      url: serviceHost + url,
      headers: newHeader,
      data,
    }).then(res => {
      // if (!res.Success) {
      //   return Promise.reject(res);
      // }
      return res;
    }).catch(err => {

      return Promise.reject(err);
    });
  },

  async mallRequestByConsul({
    method, url, data, serviceType, header,
  }) {


    const serviceHost = this.ctx.service.consulConfig.getServiceHost(serviceType);
    const newHeader = Object.assign({
      source: 'h5',
    }, header || {});

    console.log(serviceHost + url);
    return request({
      method,
      url: serviceHost + url,
      headers: newHeader,
      data,
    }).then(res => {
      // if (!res.Success) {
      //   return Promise.reject(res);
      // }
      return res;
    }).catch(err => {

      return Promise.reject(err);
    });
  },

  successBody(data = {}) {
    this.ctx.body = {
      code: 200,
      message: 'ok',
      data,
    };
    this.ctx.logger.info('success_log，用户信息: %j，请求参数: %j，返回参数: %j', this.ctx.session, this.ctx.request.body, {
      code: 200,
      message: 'ok',
      data,
    });
  },

  errorBody(code, message) {
    this.ctx.body = {
      Status: code,
      Msg: message,
      Result: null,
    };
    this.ctx.logger.info('warning_log，用户信息: %j，请求参数: %j，返回参数: %j', this.ctx.session, this.ctx.request.body, {
      Status: code,
      Msg: message,
      Result: null,
    });
  },

  throwErrorBody(code, message) {
    this.ctx.throw({ code, message });
  },

  readFile(url) {
    return new Promise(function(resolved, rejected) {
      fs.readFile(url, 'utf-8', function(error, data) {
        if (error) {
          console.log('读取' + url + '文件失败：' + error.message);
          rejected(error);
          return;
        }
        const newData = JSON.parse(data);
        resolved([ newData.Version, newData.Cluster, newData.PublishId ]);

      });
    });
  },

  getIPAdress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  },

};
