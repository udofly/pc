import request from '@/utils/request';
import { deviceId } from "@popjs/core/utils/helper";


export async function apiPySystemAuthLogin(params: object) {
    return request({
        url: '/api_v1/system/auth/login',
        params: {
            guard: 'web',
            device_type: 'h5',
            device_id: deviceId(),
            ...params
        }
    });
}

/**
 * 登录访问
 */
export async function apiPySystemAuthAccess(params = {}, from = 'app') {
    return request({
        url: '/api_v1/system/auth/access',
        params,
        from
    });
}

/**
 * 退出登录
 */
export async function apiPySystemAuthLogout(from = 'app') {
    return request({
        url: '/api_v1/system/auth/logout',
        from
    });
}

/**
 * Core Info
 */
export async function apiPySystemCoreInfo() {
    return request({
        url: '/api_v1/system/core/info'
    });
}
