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
      if (Data.SignStr) {
        this.ctx.session.user = Data;
        this.ctx.redirect(this.ctx.session.rtUrl);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}
