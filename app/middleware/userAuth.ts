
module.exports = () => {
  return async function userAuth(ctx, next) {


    const { rturl, signstr, murl } = ctx.request.header;

    const brandId = ctx.request.header['ezr-brand-id'];
    if (brandId) {
      ctx.session.brandId = brandId;
    } else {
      ctx.helper.errorBody(60001, '品牌号不能为空');
      return null;
    }

    if (rturl) {
      ctx.session.rtUrl = rturl;
    }

    if (murl) {
      Object.assign(global, {
        mUrl: murl,
      });

    }
    ctx.logger.info('info_log，middleware-userAuth-info信息: %j', ctx.session);
    if (signstr) {
      await next();
    } else {
      await ctx.service.auth.getAuthUrl();
      return null;
    }
  };
};

