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

  config.apiDomain = {
    url: 'http://192.168.12.162:6092',
  };

  config.consul = {
    // ip: '192.168.12.102',
    ip: '10.0.0.18',
    port: '8000',
  };

  return config;
};
