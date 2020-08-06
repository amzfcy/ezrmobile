import { request } from '../utils/http';

module.exports = {

  async mallRequest(method, url: string, data: object) {
    
    return request({
      method,url,
      data,
    }).then(res => {
        console.log(res)
      if (!res.Success) {
        return Promise.reject(res);
      }
      return res.Result;
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


};
