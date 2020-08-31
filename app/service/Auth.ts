import { Service } from 'egg';
import { stringify } from 'qs';
declare namespace global {
  export let mUrl: any;

}
export default class Auth extends Service {

  public async getAuthUrl() {

    try {
      const queryParams = {
        brandId: this.ctx.session.brandId,
        rtUrl: this.ctx.session.rtUrl,
        IsNewWeiXinNode: true,
      };
      console.log(queryParams);
      let data = await this.ctx.helper.mallRequestByConsul({
        method: 'GET',
        url: '/Wx/OAuth/GetBaseAuthorizeUrl?' + stringify(queryParams),
        serviceType: 'mp',
      });
      console.log(data);
      // console.log(OAuthCallBack);
      if (data.Success) {
        data = {
          ...data,
          Status: 10001,
          Success: false,
        };
      }
      this.ctx.body = data;


    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async baseCallBack(params) {
    try {

      console.log('122121212');
      console.log(global.mUrl + '?SignStr=' + 1);
      const Data = await this.ctx.helper.mallRequest({
        method: 'GET',
        url: '/Wx/OAuth/BaseCallback?' + stringify(params),
        serviceType: 'mp',
      });
      this.ctx.logger.info('info_log，baseCallBack-info信息: %j', Data.Result);

      if (Data.Success) {
        this.ctx.redirect(global.mUrl + '?SignStr=' + Data.Result.SignStr);
        // this.ctx.session.user = Data.Result;
      } else {
        console.log('111111');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}
