import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path');
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596472757440_9019';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };


  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://*:*/']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
  };

  config.assets = {
    publicPath: '/public',
    // devServer: {
    //   autoPort: true,
    //   command: 'umi dev --port={port}',
    //   env: {
    //     APP_ROOT: path.join(__dirname, '../app/web'),
    //     BROWSER: 'none',
    //     SOCKET_SERVER: 'http://127.0.0.1:{port}',
    //   },
    //   debug: true,
    // },
  };
  config.security = {
    csrf: false,
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
