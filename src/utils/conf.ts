/*
 * 全局配置
 * 文件描述：
 *    主要存放路径及接口相关
 *      iconUrl: 字体文件路径
 *    storageKey: 存入的 storage 的 key
 *      api: 系统接口相关
 */

// 访问接口URL

export const appUrl: string = String(import.meta.env.VITE_APP_URL);

// App 版本号
export const appVersion = String(import.meta.env.DEF_APP_VERSION);

// app build path
export const appPath = String(import.meta.env.DEF_APP_PATH);

// app 名称
export const appName = String(import.meta.env.VITE_APP_NAME) ?? 'kejinshou';

// App 名称
export const appTitle = appName === 'kejinshou' ? '氪金兽' : '号玩么';

// App 环境
export const appMode = String(import.meta.env.MODE);

// 是否是生产环境
export const appIsProd = import.meta.env.PROD;

// 存储KEY
export const storageKey = {
    DEVICE_SYS_NAME: 'x-sys-name',
    BROWSER_INFO: 'browser-info',
    PY_CORE_INFO: 'x-core',
    PC_TOKEN: 'pc-token',
    PC_IM_TOKEN: 'pc-im-token',
    PC_USER: 'pc-user',
    PC_CRAFT: 'pc-craft'
}

// 访问接口URL
export const imApiUrl: string = String(import.meta.env.VITE_IM_URL);

// AppKey
export const imAppKey: string = String(import.meta.env.VITE_IM_APP_KEY);

// sentryDsn
export const sentryDsnUrl: string = String(import.meta.env.VITE_SENTRY_DSN_URL);
