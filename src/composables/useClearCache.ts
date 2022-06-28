import { appLocalStore } from '@/utils/utils';
import { each, get, keys, split } from 'lodash-es';
import { useRouter } from 'vue-router';

/**
 * 登录和 Token 的保存以及跳转
 */
export default function useClearCache() {
    let router = useRouter();
    const clear = get(router.currentRoute.value, 'query.clear', '');

    // clear 清除缓存信息 [:app-{xxx}/:x-core]
    if (clear) {
        let lsKeys = keys(localStorage);
        each(lsKeys, function (key) {
            // 设备ID 不清除
            if (key.indexOf('x-id') >= 0) {
                return;
            }
            let ks = split(key, ':')
            // 清除缓存
            appLocalStore(ks[1], null);
        });
    }
}
