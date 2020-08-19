import { Controller } from 'egg';

export default class OauthController extends Controller {
  public async basecallback() {
    const { ctx } = this;
    const { brandId, type, shareParam } = ctx.params;
    const { code, state } = ctx.query;
    return await this.ctx.service.auth.baseCallBack({
      brandId,
      oauthtype: type,
      code,
      state,
      shareParam,
    });
  }
}
