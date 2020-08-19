import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.consul = {
    ip: '10.0.0.18',
    port: '8500',
  };

  return config;
};
