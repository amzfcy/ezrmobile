import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {

    const { ctx } = this;

    const { servicetype } = ctx.request.header;
    try {
      const data = await ctx.helper.mallRequest({
        method: ctx.request.method,
        header: ctx.request.header,
        data: ctx.request.body,
        url: ctx.request.url.replace('/api', ''),
        serviceType: servicetype,
      });

      this.ctx.body = data;
    } catch (error) {
      console.log('11111');
      if (error.response.status === 404) {
        this.ctx.helper.errorBody(404, '接口不存在');

      } else {
        if (error.response.data) {
          // console.log(error.response.data);
          this.ctx.body = error.response.data;
        } else {
          console.log('333333');
          this.ctx.helper.errorBody(404, '接口错误');
        }
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
