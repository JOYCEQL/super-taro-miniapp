// 接口前缀
let config = {
  development: {
    baseUrl: 'https://backend.yiwise.com',
  },
  production: {
    baseUrl: 'https://backend.yiwise.com',
  },
};

const env = config[process.env.NODE_ENV as any];

export default env;
