import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { userAuth } = app.middleware;
  router.get('/scanv', controller.home.scanv);
  router.get('/scanv', controller.oauth.basecallback);
  router.all('/api/*', userAuth(), controller.home.api);
};
