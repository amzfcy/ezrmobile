import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {

    const { ctx } = this;

    const { servicetype, signstr } = ctx.request.header;
    try {
      const data = await ctx.helper.mallRequest({
        method: ctx.request.method,
        header: {
          SignStr: signstr,
        },
        url: ctx.request.url.replace('/api', ''),
        serviceType: servicetype,
      });
      console.log(data);
      this.ctx.body = data;
    } catch (error) {
      if (error.response.status === 404) {
        this.ctx.helper.errorBody(404, '接口不存在');

      } else {
        this.ctx.helper.errorBody(500, '接口错误');
      }
    }

  }

  public async scanv() {
    this.ctx.body = {
      code: 200,
      msg: 'ok',
    };
    // this.ctx.helper.successBody();
  }
}
