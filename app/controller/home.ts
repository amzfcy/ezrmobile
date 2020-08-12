import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {

    const { ctx } = this;
    const { SignStr } = ctx.session.user;
    const { serviceType } = ctx.headers;
    console.log(ctx.request);
    return await ctx.helper.mallRequest({
      method: ctx.request.method,
      header: {
        SignStr,
      },
      url: ctx.request.url,
      serviceType,
    });


  }

  public async scanv() {
    this.ctx.helper.successBody();
  }
}
