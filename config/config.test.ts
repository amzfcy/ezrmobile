import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.consul = {
    ip: '10.0.0.18',
    port: '8500',
  };
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
    name: 'https://wxavip-q1.ezrpro.com',
    type: 'miniEx',
  }];
  return config;
};
