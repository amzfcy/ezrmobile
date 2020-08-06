import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async api() {
    console.log('1111111')
    this.ctx.body={
      a:1
    }
    //const { ctx } = this;
   // ctx.render('index.html');
  }
}
