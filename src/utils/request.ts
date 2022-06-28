import { appUrl, appVersion, storageKey } from '@/utils/conf';
import { envLocalStore } from '@/utils/utils';
import { each, forEach, isNaN, isNil, isNull, isObject, keys, set, trim } from 'lodash-es';
import { MD5 } from 'crypto-js';
import { store } from '@/store';
import { pyBasicHeader, pyGet, pyPost, pyPut } from "@popjs/core/utils/request";
import { ElNotification } from "element-plus";


/**
 * 请求签名
 * @param params
 * @param token
 * @param os
 * @param version
 */
const requestSignV1 = (params: any, token = '', os = 'h5', version = '1.0.0') => {
    let debug = false;
    let str = '';
    let paramsKeys = keys(params);
    paramsKeys.sort();
    forEach(paramsKeys, function (key) {
        if (key !== 'image' && key !== 'file') {
            if (isObject(params[key])) {
                str += key + '=' + JSON.stringify(params[key]) + ','
            } else {
                str += key + '=' + params[key] + ','
            }
        }
    });
    str = str.slice(0, -1);
    let step1Md5 = MD5(MD5(str).toString() + token).toString();
    let step2Md5 = String(MD5(step1Md5 + os + version));
    let funFirstDigit = (str: string) => {
        let num = str.match(/[0-9]/);
        let digit;
        if (isNull(num)) {
            digit = 8;
        } else {
            digit = num[0];
        }
        return digit;
    };

    let funLastChar = (str: string) => {
        let fs = str.split('').reverse().join('');
        let chars = fs.match(/[a-z]/);
        let char;
        if (isNull(chars)) {
            char = 'b';
        } else {
            char = chars[0];
        }
        return char;
    };

    let firstDigit = funFirstDigit(step2Md5);
    let lastChar = funLastChar(step2Md5);

    let signStr = `${firstDigit}${step2Md5.charAt(1)}${step2Md5.charAt(3)}${step2Md5.charAt(7)}${step2Md5.charAt(15)}${lastChar}${step2Md5.charAt(31)}`
    if (debug) {
        console.log('ori:', str, 'token:', token, 'step1:', step1Md5, 'step2:', step2Md5, 'fd:', firstDigit, 'lc', lastChar, 'sign', signStr);
    }
    return signStr;
};


// 请求方法
const fetch = (options: RequestOptions) => {
    const os = 'webapp';
    let { method = 'post', params: oriParams = {}, url } = options;
    let params: any;
    if (oriParams instanceof FormData) {
        params = new FormData();
        for (let pair of oriParams.entries()) {
            if (!isNil(pair[1]) && !isNaN(pair[1])) {
                let sv = pair[1];
                if (typeof pair[1] === 'string') {
                    sv = trim(pair[1]);
                }
                params.append(pair[0], sv);
            }
        }
    } else {
        params = {};
        each(oriParams, function (val, key) {
            if (!isNil(val) && !isNaN(val)) {
                let sv = val;
                if (typeof val === 'string') {
                    sv = trim(val);
                }
                set(params, key, sv);
            }
        })
    }


    let token = envLocalStore(storageKey.PC_TOKEN);
    set(params, 'timestamp', Math.round(new Date().getTime() / 1000));
    set(params, 'sign', requestSignV1(params, token ? token : '', os, appVersion));

    // stip : 这里使用 data = {...params, token : token || ''}, 则会丢失form表单的数据

    //x-sys-network  x-sys-cpu
    let bearer = token ? `Bearer ${token}` : '';
    let headers = {
        'x-os': os,
        'x-ver': appVersion,
        'x-app-sign': '1.0',
        ...pyBasicHeader()
    }
    switch (method.toLowerCase()) {
        case 'get':
            return pyGet(url, {
                baseURL: appUrl,
                params,
                headers: {
                    'Authorization': bearer,
                    ...headers
                }
            });
        default:
        case 'post':
            return pyPost(url, params, {
                baseURL: appUrl,
                headers: {
                    'Content-Type': params instanceof FormData ? 'multipart/form-data' : 'application/json',
                    'Authorization': bearer,
                    ...headers
                }
            });
        case 'put':
            return pyPut(url, params);
    }
};

export default function request(options: RequestOptions) {
    return fetch(options)
        .then((response) => {
            store.dispatch('Loaded').then()
            const { data = {}, status, message } = response.data;
            return Promise.resolve({
                success: !Boolean(status),
                status: status,
                message: message,
                data: data
            });
        })
        .catch((error) => {
            store.dispatch('Loaded').then();
            if (error.code === 401) {
                store.dispatch('pc/Logout').then();
            } else {
                ElNotification.error(error.message);
            }
            return Promise.reject(error);
        });
}

