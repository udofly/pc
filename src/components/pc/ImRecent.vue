<template>
    <div class="side x--pc-recent">
        <im-avatar/>
        <im-search/>
        <im-session/>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { clone, find, get, isNumber, set, sumBy } from 'lodash-es';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import ImAvatar from '@/components/pc/ImAvatar.vue';
import ImSearch from '@/components/pc/ImSearch.vue';
import ImSession from '@/components/pc/ImSession.vue';

const store = useStore();
const router = useRouter();
const trans = reactive({
    tid: computed(() => store.state.pc.tid),
    recent: computed(() => store.state.pc.recentList)
})


// 监听最后一条消息, 更新会话
watch(
    () => store.state.pc.lastMsg,
    (newVal: any) => {
        // 修改 Recent 的值, 并将内容更换或者追加
        // 替换 & 追加
        const nv = clone(newVal);
        let ori = store.state.pc.recentList;
        let sess = find(ori, (o) => get(o, 'session_id') === get(nv, 'session_id'));
        if (sess) {
            set(sess, 'last_msg', get(nv, 'last_msg'));
            // 非当前回话, 未读消息数 + 1
            if (trans.tid !== get(sess, 'tid')) {
                set(sess, 'unread_num', get(sess, 'unread_num') + 1);
            }
        } else {
            // 获取 session , 重新组织数据
            set(nv, 'opposite_info', get(nv, 'from'));
            if (trans.tid !== get(nv, 'tid')) {
                set(nv, 'unread_num', get(nv, 'unread_num', 0) + 1);
            }
        }
        store.dispatch('pc/ImRecent', [sess])
    },
    { deep: true }
);

// 统计未读的消息数量
watch(() => trans.recent, (newVal) => {
    let num = sumBy(newVal, (item) => {
        let unReadNum = get(item, 'unread_num');
        if (isNumber(unReadNum)) {
            return unReadNum;
        }
        return 0;
    })
    store.dispatch('pc/ImUnreadNum', {
        num
    })
}, { deep: true })


</script>
<style scoped lang="less">


.side {
    height: 100vh;
    overflow: auto;
    border-right: 1px solid var(--pc-color-bg-main);
    background: var(--k-color-white);
}
</style>