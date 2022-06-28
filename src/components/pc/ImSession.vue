<template>
    <el-scrollbar class="content" v-if="!trans.atSearch">
        <a-list :loading="trans.loading" :data-source="trans.recent" v-if="!trans.kw">
            <template #renderItem="{ item }">
                <a-list-item @click="onSelectTid(get(item, 'tid'))"
                    :class="{active: get(item, 'tid') === trans.tid}">
                    <a-list-item-meta :description="imLastMsg(get(item, 'last_msg'))" class="meta">
                        <template #title>
                            <em>{{ imKfRemark(get(item, 'opposite_info')) }}</em>
                            <span>{{ formatUnixFromNow(get(item, 'last_msg.timestamp')) }}</span>
                            <icon-font type="icon-star-fill" v-if="get(item, 'is_sticky')"></icon-font>
                        </template>
                        <template #avatar>
                            <a-badge :count="get(item, 'unread_num')">
                                <el-avatar :src="get(item, 'opposite_info.icon')"/>
                            </a-badge>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <div class="recent-more" v-if="!(trans.nextPage> trans.pages)">
            <a-spin v-if="trans.isLoadingMore"/>
            <a-button v-else type="link" @click="onSessionLoad">加载更多</a-button>
        </div>
        <div class="recent-more" v-else>
            &nbsp;
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
// 数据变化或者初始化存在值的时候执行数据的更新
import { computed, defineComponent, onMounted, reactive, watch } from 'vue';
import { apiImClientSessionList } from '@/services/im';
import { find, first, get } from 'lodash-es';
import { imLastMsg, pcToast, imKfRemark } from '@/utils/pc';
import { useStore } from '@/store';
import { formatUnixFromNow } from '@/utils/utils';
import { useRouter } from 'vue-router';
import IconFont from '@/components/base/IconFont';

defineComponent({
    IconFont
})

const store = useStore();
const router = useRouter();

let routerTid = get(router.currentRoute.value.params, 'tid');

const trans = reactive({
    atSearch: computed(() => store.state.pc.imSearch),
    loading: false,
    nextPage: 1,
    pages: 428,
    isLoadingMore: false,
    // 当前选中的 SessionId
    tid: computed(() => store.state.pc.tid),
    // 当前左侧列表(根据最后一条消息进行排序)
    recent: computed(() => store.getters.imRecent)
})

const onSessionLoad = async () => {
    if (trans.nextPage === 1) {
        trans.loading = true;
    } else {
        trans.isLoadingMore = true;
    }

    apiImClientSessionList({
        page: trans.nextPage
    }, 'pc').then(({ success, data, message }) => {
        if (trans.nextPage === 1) {
            trans.loading = false;
        } else {
            trans.isLoadingMore = false;
        }
        if (!success) {
            pcToast(message, success);
            return;
        }

        // pagination : {total: 39, page: 1, size: 20, pages: 2}
        const page = trans.nextPage;

        trans.nextPage = get(data, 'pagination.page') + 1;
        trans.pages = get(data, 'pagination.pages');
        // 持续添加
        store.dispatch('pc/ImRecent', data.list);

        // 第一次请求, 没有 tid 的时候选中第一个
        if (page === 1) {
            let firstEl = first(data.list);
            let tid = routerTid ? routerTid : get(firstEl, 'tid');
            onSelectTid(tid);
        }

        //如果列表中不存在则清除掉.代码写了,宋时昊不用,避免浪费,注释在此处.
        // if (page === 1) {
        //     let tid = '';
        //     if (routerTid) {
        //         let contain = find(data.list, function (item) {
        //             return get(item, 'tid') === routerTid;
        //         });
        //         if (contain) {
        //             tid = routerTid;
        //         }
        //     } else {
        //         let firstEl = first(data.list);
        //         tid = get(firstEl, 'tid');
        //     }
        //     onSelectTid(tid);
        // }

    });
};


const onSelectTid = (tid: any) => {
    if (!tid) {
        return;
    }
    // 非当前路由, 切换路由
    router.replace({
        name: 'pc.chat',
        params: { tid }
    });
    store.dispatch('pc/ImSession', {
        tid: tid
    });

}

watch(() => store.state.pc.imToken, (newVal) => {
    if (!newVal) {
        return;
    }
    onSessionLoad();
}, { deep: true })

onMounted(() => {
    if (!store.state.pc.imToken) {
        return;
    }
    onSessionLoad();
})
</script>

<style scoped lang="less">
.content {
    height: calc(100vh - 137px);
}

.el-avatar {
    background: var(--k-color-white);
}
</style>
