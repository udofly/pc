import imRequest from '@/utils/im-request';
import { set } from "lodash-es";

/**
 * 图片上传
 * @param file
 * @param from
 */
export function apiImClientUploadFile({ file }) {
    const data = new FormData()
    data.set('file', file, file.name)
    return imRequest({
        url: 'client/upload/file',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: data
    });
}
/**
 * 视频上传获取凭证信息
 * */
export  function apiImClientVideoOSS(){
    return imRequest({
        url: 'client/setting/temp_oss'
    });
}

/**
 * 历史消息
 * @param {object} params
 */
export function apiImClientSessionList(params: object) {
    return imRequest({
        url: 'client/session/list',
        params
    });
}

/**
 *
 * @param params
 */
export function apiImClientSessionInfo(params: object) {
    return imRequest({
        url: 'client/session/info',
        params
    });
}

/**
 * 历史消息
 */
export function apiImClientMessageHistory(params: object) {
    set(params, 'show_origin', 1);
    return imRequest({
        url: 'client/message/history',
        params
    });
}
