
interface AppBootHook{
  app: any;
}

class AppBootHook {

  constructor(app) {
    this.app = app;
  }

  // configWillLoad() {

  // }

  // async didLoad() {

  // }

  // async willReady() {

  // }

  async didReady() {
    // 应用已经启动完毕


  }

  async serverDidReady() {
    const ctx = await this.app.createAnonymousContext();
    ctx.service.consulConfig.init(7001);

    // this.app.service.consulConfig.init('7001')
    console.log('1111111');
  }
}

module.exports = AppBootHook;
