module.exports = () => {
    return async function userAuth(ctx, next) {
      const { user } = ctx.session;
      const { brandId } = ctx.request.header;
      ctx.session.brandId=brandId||1;
      if (user&&user.SignStr) {
        await next();
      } else {
        await  ctx.service.auth.getAuthUrl()
        // ctx.helper.errorBody(8001, '权限校验失败');
        return null;
      }
    };
  };
  