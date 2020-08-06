import { Service } from 'egg';
import Consul = require('node-consul');

declare namespace global {
  export let Version: any;
}

export default class ConsulConfig extends Service {

  consul=new Consul({
    host: this.app.config.consul.ip,
    port: this.app.config.consul.port,
    promisify: true,
  });

  public async init(reg) {

    const ip = this.ctx.helper.getIPAdress();

    const { ctx, app } = this;

    const newConsul = this.consul;

    this.ctx.helper.readFile('publish.txt').then(function(publishInfo) {
      global.Version = publishInfo[0];

      // 监听应用的kv变化
      const watch = newConsul.watch({
        method: newConsul.kv.get,
        options: { key: 'ConsumerInvoke:' + app.config.consul.appName + '/' + publishInfo[0] },
        backoffFactor: 1000,
      });
      watch.on('change', function(data) {
        ctx.service.consulConfig.triggerGetConfig(data && data.Value ? JSON.parse(data.Value) : []);
      });
      watch.on('error', function(err) {
        console.log('watch err.... ', err);
      });

      // 监听以下服务的变化

      console.log(app.config.consul);
      app.config.consul.service.forEach(item => {
        newConsul.watch({
          method: newConsul.health.service,
          options: { service: item },
          backoffFactor: 1000,
        }).on('change', data => {
          ctx.service.consulConfig.triggerGetConfig(data && data.Value ? JSON.parse(data.Value) : []);
        });
      });


      // 注册consul服务
      newConsul.agent.service.register({
        name: app.config.consul.appName,
        id: ip + ',' + reg,
        address: ip,
        port: reg,
        tags: [ 'p:http', 'v:' + publishInfo[0] ],
        meta: { Cluster: publishInfo[1], RegisterTime: String(Date.now()), PublishId: publishInfo[2] },
        check: {
          http: 'http://' + ip + ':' + reg + '/scanv',
          deregistercriticalserviceafter: '6s',
          ttl: '6s',
          interval: '3s',
          timeout: '5s',
        },
      }, function(err) {
        if (err) {
          console.error('consul注册失败：', err);
          throw err;
        }
        console.log(app.config.consul.appName + '：注册consul成功！');

        // 获取KV信息
        ctx.service.consulConfig.triggerGetConfig('');
      });
    }, function(error) {
      console.log('publish.txt文件读取失败: ', error);
    });
  }


  // 获取KV信息
  triggerGetConfig(data) {

    const { ctx } = this;
    if (data && data.length) {
      ctx.service.consulConfig.triggerGetService(0, data.length, data, function(result) {
        ctx.service.consulConfig.refactorService(result);
      });
    } else {
      ctx.service.consulConfig.getConfig('ConsumerInvoke:' + this.app.config.consul.appName + '/' + global.Version).then(data => {
        ctx.service.consulConfig.triggerGetService(0, data && data.length ? data.length : 0, data, function(result) {
          ctx.service.consulConfig.refactorService(result);
        });
      }, err => {
        console.log(err);
      });
    }
  }

  triggerGetService(i, length, data, callback) {
    const { ctx } = this;
    if (data && data.length) {
      ctx.service.consulConfig.getHeathService(data[i].ServerApp).then(service => {
        service.map(item => {
          return item.Checks[1].Status == 'passing';
        });
        data[i].ServiceInfo = service;
        if (++i <= length - 1) {
          ctx.service.consulConfig.triggerGetService(i, length, data, callback);
        } else {
          callback(data);
        }
      });
    } else {
      callback(data);
    }
  }

  refactorService(source) {
    if (source && source.length) {
      source.forEach(element => {
        element.Service = [];
        element.Polling = 0;
        if (element.ServiceInfo) {
          element.ServiceInfo.forEach(item => {
            // 过滤每个服务status=passing并且符合基本版本的api
            if (item.Checks[1].Status == 'passing' && item.Service.Tags[1].indexOf(element.Version) > -1) {
              element.Service.push('http://' + item.Service.Address + ':' + item.Service.Port);
            }
          });
        }
        if (element.BrandVersion && element.BrandVersion.length) {
          element.BrandVersion.forEach(item => {
            item.Service = [];
            item.Polling = 0;
            if (element.ServiceInfo) {
              element.ServiceInfo.forEach(serviceItem => {
                if (serviceItem.Checks[1].Status == 'passing' && serviceItem.Service.Tags[1].indexOf(item.Version) > -1) {
                  item.Service.push('http://' + serviceItem.Service.Address + ':' + serviceItem.Service.Port);
                }
              });
            }
          });
        }
      });
      global['ConsumerInvoke:' + this.app.config.consul.appName + '/' + global.Version] = source;
    } else {
      global['ConsumerInvoke:' + this.app.config.consul.appName + '/' + global.Version] = [];
    }
  }

  async getConfig(key) {
    const result = await this.consul.kv.get(key);
    if (!result) {
      return Promise.reject(key + '不存在');
    }
    return JSON.parse(result.Value);
  }

  // 获取健康节点
  async getHeathService(options) {
    const service = await this.consul.health.service(options);
    if (!service) {
      return Promise.reject(service);
    }
    return service;
  }

  public getServiceHost(appType) {
    console.log(appType);
    const serviceList = global['ConsumerInvoke:' + this.app.config.consul.appName + '/' + global.Version];
    console.log(serviceList);
  }

}
