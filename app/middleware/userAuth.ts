
module.exports = () => {
  return async function userAuth(ctx, next) {

    const { brandid, rturl, signstr, murl } = ctx.request.header;

    if (brandid) {
      ctx.session.brandId = brandid;
    } else {
      ctx.helper.errorBody(60001, '品牌号不能为空');
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

