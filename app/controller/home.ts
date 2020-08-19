import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {

    const { ctx } = this;
    const { SignStr } = ctx.session.user;
    const { servicetype } = ctx.request.header;
    console.log(ctx.request);
    return await ctx.helper.mallRequest({
      method: ctx.request.method,
      header: {
        SignStr,
      },
      url: ctx.request.url,
      serviceType: servicetype,
    });
  }

  public async scanv() {
    this.ctx.body = {
      code: 200,
      msg: 'ok',
    };
    // this.ctx.helper.successBody();
  }
}
