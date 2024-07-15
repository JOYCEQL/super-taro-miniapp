import { request } from '@/utils/request';

/**
 * @param {Object} data
 * @returns {Promise}
 * @description 获取demo数据
 */
export const getDemoData = (data = null) => {
  return request({
    url: `/xxx/xx/xx`,
    data,
  });
};
