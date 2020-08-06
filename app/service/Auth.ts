import { Service } from 'egg';
import { stringify } from 'qs';

export default class Auth extends Service {

  public async getAuthUrl() {

    try {
      const queryParams = {
        brandId: this.ctx.session.brandId,
        IsNewWeiXinNode: true,
      };
      const { OAuthCallBack } = await this.ctx.helper.mallRequest('GET', '/Wx/OAuth/GetBaseAuthorizeUrl?' + stringify(queryParams));
      console.log(OAuthCallBack);
      if (OAuthCallBack) {
        this.ctx.redirect(OAuthCallBack);
      }

    } catch (error) {
      return null;
    }
  }
}
