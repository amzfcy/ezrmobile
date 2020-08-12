module.exports = () => {
  return async function userAuth(ctx, next) {
    const { user } = ctx.session;
    const { brandId } = ctx.request.header;
    ctx.session.brandId = brandId || 429;
    console.log(1212122112212121);
    console.log('user', user);
    console.log(21212112999909009);
    if (user && user.SignStr) {
      await next();
    } else {
      await ctx.service.auth.getAuthUrl();
      return null;
    }
  };
};

