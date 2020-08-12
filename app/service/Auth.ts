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
      const { OAuthCallBack } = await this.ctx.helper.mallRequest({
        method: 'GET',
        url: '/Wx/OAuth/GetBaseAuthorizeUrl?' + stringify(queryParams),
      });
      console.log(OAuthCallBack);
      if (OAuthCallBack) {
        this.ctx.redirect(OAuthCallBack);
      }

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
      if (Data.SingStr) {
        this.ctx.session.user = Data;
        console.log('00000000099999');
        console.log(this.ctx.session.user);
        console.log('00000000099999');
      }

    } catch (error) {
      console.log(error);
      return null;
    }
  }


}
