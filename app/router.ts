import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const {  userAuth } = app.middleware;
  router.all('/api/*', userAuth(), controller.home.api);
};
