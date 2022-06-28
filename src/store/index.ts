import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AllStateTypes, RootStateTypes } from './types'

import poppy from './modules/poppy'
import pc from '@/store/modules/pc';
import { get, sortBy } from 'lodash-es';

export const store = createStore<RootStateTypes>({
    state: {
        text: 'This is Vuex Root.state.text',
        loading: false
    },
    getters: {
        loading(state: any) {
            return state.loading;
        },
        imRecent(state: any) {
            return sortBy(state.pc.recentList, function (sess) {
                // 置顶排序加入 和 时间戳长度一致的权重
                let sticky = 0;
                let member = 0;
                if (get(sess, 'is_sticky')) {
                    sticky = 1000000000;
                }
                return -get(sess, 'last_msg.timestamp', 0) - sticky - member;
            })
        }
    },
    mutations: {},
    actions: {
        Loading({ state }) {
            state.loading = true
        },
        Loaded({ state }) {
            state.loading = false
        }
    },
    modules: {
        poppy,
        pc
    }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key)
}
