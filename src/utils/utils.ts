import { appMode, appName, appPath, appVersion, storageKey } from '@/utils/conf';
import UAParser from 'ua-parser-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/zh-cn'
import { each } from 'lodash-es';
import { localStore, sessionStore } from '@popjs/core/utils/helper';


/**
 * 实现localStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const appLocalStore = (key: any, val?: any) => {
    return localStore(hashKey(key), val);
};

/**
 * 实现localStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const envLocalStore = (key: any, val?: any) => {
    return localStore(envKey(key), val);
};

/**
 * 实现sessionStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const appSessionStore = (key: any, val?: any) => {
    return sessionStore(hashKey(key), val);
};

/**
 * 实现sessionStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const envSessionStore = (key: any, val?: any) => {
    return sessionStore(envKey(key), val);
};


export const deviceType = () => {
    if (appLocalStore(storageKey.DEVICE_SYS_NAME)) {
        return appLocalStore(storageKey.DEVICE_SYS_NAME);
    } else {
        let name = new UAParser().getOS().name
        appLocalStore(storageKey.DEVICE_SYS_NAME, name);
        return name
    }
};

export const browserInfo = () => {

    if (appLocalStore(storageKey.BROWSER_INFO)) {
        return appLocalStore(storageKey.BROWSER_INFO);
    } else {
        let version = new UAParser().getBrowser()
        appLocalStore(storageKey.BROWSER_INFO, version);
        return version
    }
};


/**
 * 通过域名 + 版本号摒弃缓存
 * 这个地方和清空缓存有关系, 注意使用, 这里必须要有 `:`
 * @returns {*}
 */
export const hashKey = (key: string) => {
    let genKey = `${appMode}-${appVersion}:${key}`;
    if (genKey.indexOf(':') < 0) {
        console.error('生成的KEY不包含 :, 会导致清理缓存异常');
    }
    return genKey;
};

export const envKey = (key: string) => {
    let genKey = `${appMode}:${key}`;
    if (genKey.indexOf(':') < 0) {
        console.error('生成的KEY不包含 :, 会导致清理缓存异常');
    }
    return genKey;
};

/**
 * 用于 Im 的时间展示
 * @param timestamp
 */
export const formatUnixFromNow = (timestamp: any) => {
    if (!timestamp) {
        return ''
    }
    dayjs.extend(relativeTime);
    dayjs.locale(locale.name);
    return dayjs().to(dayjs(timestamp * 1000))
}

/**
 * 用于 Im 的时间展示
 * @param timestamp
 * @param format
 */
export const formatUnixTimestamp = (timestamp: any, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!timestamp) {
        return '####-##-##'
    }
    dayjs.locale(locale.name);
    return dayjs(timestamp * 1000).format(format);
}


export const ossImage = (url: string, size: number) => {
    return `${url}?x-oss-process=image/resize,l_${size}`;
}

export const ossVideo = (url: string, size: number = 750) => {
    return `${url}?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast`;
}

export const parseNodes = (nodes: any) => {
    let imgs = [];
    let texts = [];
    let divs = [];
    for (let nd of nodes) {
        if (nd.nodeName === 'IMG') {
            imgs.push(nd);
        } else if (nd.nodeName === '#text') {
            texts.push(nd);
        } else {
            const { imgs: imgSub, texts: textsSub, divs: divsSub } = parseNodes(nd.childNodes);
            each(imgSub, (item) => {
                imgs.push(item)
            })
            each(textsSub, (item) => {
                texts.push(item)
            })
            each(divsSub, (item) => {
                divs.push(item)
            })
        }
    }
    return {
        imgs, texts, divs
    }
}

export const themeAssets = (name: string, type = '.png'): string => {
    return `${appPath}assets/theme/${appName}/${name}${type}`
}

