import { Service } from 'egg';
import { stringify } from 'qs';

export default class Auth extends Service {

  public async getAuthUrl() {

    try {
      const queryParams = {
        brandId: this.ctx.session.brandId,
        IsNewWeiXinNode: true,
      };
      console.log(queryParams);
      let data = await this.ctx.helper.mallRequest({
        method: 'GET',
        url: '/Wx/OAuth/GetBaseAuthorizeUrl?' + stringify(queryParams),
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

      const Data = await this.ctx.helper.mallRequest({
        method: 'GET',
        url: '/Wx/OAuth/BaseCallback?' + stringify(params),
      });
      this.ctx.logger.info('info_log，info信息: %j', Data);
      if (Data.Success) {
        this.ctx.session.user = Data.Result;
        this.ctx.redirect(this.ctx.session.rtUrl || 'https://m-q1.ezrpro.cn');
      } else {
        console.log('111111');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}
