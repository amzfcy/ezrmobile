module.exports = () => {
  return async function userAuth(ctx, next) {
    const { user } = ctx.session;
    console.log(ctx.request.header);

    const { brandid, rturl } = ctx.request.header;
    ctx.session.brandId = brandid;
    ctx.session.rtUrl = rturl;
    if (user && user.SignStr) {
      await next();
    } else {
      await ctx.service.auth.getAuthUrl();
      return null;
    }
  };
};

