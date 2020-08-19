import { request } from '../utils/http';
import fs = require('fs');

module.exports = {

  async mallRequest({
    method, url, data, serviceType, header,
  }) {
    const serviceHost = this.ctx.service.consulConfig.getServiceHost(serviceType);
    const newHeader = Object.assign({
      source: 'h5',
    }, header || {});
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
    }).catch(err => Promise.reject(err || '请求错误'));
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
      code,
      message,
    };
    this.ctx.logger.info('warning_log，用户信息: %j，请求参数: %j，返回参数: %j', this.ctx.session, this.ctx.request.body, {
      code,
      message,
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
