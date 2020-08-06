import { Controller } from 'egg';

export default class OauthController extends Controller {
  public async basecallback() {
    this.ctx.body = {
      a: 1,
    };
  }
}
