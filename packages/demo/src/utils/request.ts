import Taro from '@tarojs/taro';
import env from './env';

const { baseUrl } = env;

export function request(config) {
  const { url, data, method = 'GET', header } = config;

  const requestConfig = {
    url: `${baseUrl}${url}`,
    data,
    method,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      ...header,
    },
    complete: (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        Taro.showToast({
          title: '系统错误',
          icon: 'error',
        });
      }
    },
  };
  return Taro.request(requestConfig);
}

export { baseUrl };
