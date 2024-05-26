// eurekaClient.js

const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'notification-service', // Specify a generic name for your Node.js service
    instanceId: 'notification-service-instance',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': 3000,
      '@enabled': 'true',
    },
    vipAddress: 'notification-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

module.exports = client;
