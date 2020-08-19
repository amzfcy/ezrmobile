// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHandleError from '../../../app/middleware/handleError';
import ExportUserAuth from '../../../app/middleware/userAuth';

declare module 'egg' {
  interface IMiddleware {
    handleError: typeof ExportHandleError;
    userAuth: typeof ExportUserAuth;
  }
}
