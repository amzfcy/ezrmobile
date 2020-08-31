import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };

  config.consul = {
    ip: '192.168.12.102',
    // ip: '10.0.0.18',
    port: '8500',
  };

  // config.serverHost = [{
  //   name: 'http://test.ezrpro.com',
  //   type: 'miniMall',
  // }, {
  //   name: 'http://test.ezrpro.com',
  //   type: 'miniProd',
  // }, {
  //   name: 'http://test-gift.ezrpro.com',
  //   type: 'miniWx',
  // }, {
  //   name: 'http://test-wxavip.ezrpro.com',
  //   type: 'miniEx',
  // }];

  config.serverHost = [{
    name: 'https://wxa-q1.ezrpro.com',
    type: 'miniMall',
  }, {
    name: 'https://wxa-pro-q1.ezrpro.com',
    type: 'miniProd',
  }, {
    name: 'https://wxa-giftcard-q1.ezrpro.com',
    type: 'miniWx',
  }, {
    name: 'https://test-wxavip.ezrpro.com',
    type: 'miniEx',
  }];

  return config;
};
