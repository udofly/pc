import { appSessionStore } from '@/utils/utils';
import { MD5 } from 'crypto-js';
import { imApiUrl, imAppKey, storageKey } from '@/utils/conf';
import { pyPost } from "@popjs/core/utils/request";
import { ElNotification } from "element-plus";
// 请求方法
const fetch = (options: ImRequestOptions) => {
    let { params = {}, url } = options;

    params.timestamp = Math.round(new Date().getTime() / 1000);
    const timestamp = Math.round(new Date().getTime() / 1000);
    const salt = MD5(String(timestamp).toString()).toString();
    // 根据不同的请求来取不同的Token
    const token = String(appSessionStore(storageKey.PC_IM_TOKEN));
    const sign = MD5(`${imAppKey}${token}${salt}${timestamp}`).toString();

    let imHeaders = {
        'Content-Type': params instanceof FormData ? 'multipart/form-data' : 'application/json',
        'app-key': imAppKey,
        'token': token,
        'salt': salt,
        'timestamp': timestamp,
        'sign': sign,
    }
    return pyPost(url, params, {
        baseURL: imApiUrl,
        headers: imHeaders
    });
}

export default function imRequest(options: ImRequestOptions) {
    return fetch(options)
        .then((response) => {
            const { data = {}, status, message } = response.data;
            return Promise.resolve({
                success: !Boolean(status),
                status: status,
                message: message,
                data: data
            });
        })
        .catch((error) => {
            ElNotification.error(error.message);
            return Promise.reject(error);
        });
}

