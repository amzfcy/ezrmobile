
interface AppBootHook{
  app: any;
  port: number;

}

class AppBootHook {

  constructor(app) {
    this.app = app;
    this.port = 0;
  }

  configWillLoad() {

    // newbee
  }

  async didLoad() {

    // 应用已经启动完毕

  }

  // async willReady() {

  // }

  async didReady() {
    // 应用已经启动完毕


  }

  async serverDidReady() {

    this.port = this.app.server.address().port;
    const ctx = await this.app.createAnonymousContext();
    ctx.service.consulConfig.init(this.port);

  }


}

module.exports = AppBootHook;
