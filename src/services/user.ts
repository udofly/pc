/**
 * 获取用户信息
 */
import request from '@/utils/request';

/**
 * 用户详细
 */
export async function apiUserUserDetail(params = {}) {
    return request({
        url: '/api/user/user/detail',
        params
    });
}
