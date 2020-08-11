import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {

    this.ctx.body = {
      a: this.ctx.service.consulConfig.getServiceHost('mp'),
    };

    // const { ctx } = this;
    // ctx.render('index.html');
  }

  public async scanv() {

    this.ctx.body = {
      a: 1,
    };
    // const { ctx } = this;
    // ctx.render('index.html');
  }
}
