import { Module } from 'vuex'
import { PoppyTypes, RootStateTypes } from '@/store/types'
import { appSessionStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';
import { apiPySystemCoreInfo } from '@/services/poppy';
import { deviceId } from "@popjs/core/utils/helper";

// Create a new store Modules.
const poppy: Module<PoppyTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        appId: '',
        core: {}
    },
    mutations: { },
    actions: {
        Init({ state }) {
            // 设备ID
            state.appId = deviceId()

            // 系统信息
            let info: any = appSessionStore(storageKey.PY_CORE_INFO);
            if (info) {
                state.core = info

            } else {
                apiPySystemCoreInfo().then(({ success, data }) => {
                    if (success) {
                        appSessionStore(storageKey.PY_CORE_INFO, data);
                        state.core = data
                    }
                })
            }
        }
    }
}

export default poppy
