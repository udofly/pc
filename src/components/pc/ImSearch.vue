<template>
    <div class="search recent-search">
        <el-input v-model="trans.kw" size="small"
            @input="onSearch"
            placeholder="请输入昵称或者用户ID" v-loading="trans.loading">
            <template #prepend>
                <el-dropdown>
                    <el-button>
                        {{ trans.type === 'order' ? '订单' : '用户' }} <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="trans.type='user'">用户</el-dropdown-item>
                            <el-dropdown-item @click="trans.type='order'">订单</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-input>
    </div>
    <a-list :loading="trans.loading" :data-source="trans.users" v-if="trans.kw">
        <template #renderItem="{ item }">
            <a-list-item @click="onSelectTid(get(item, 'im_tid'))">
                <a-list-item-meta :description="desc(item)">
                    <template #title>
                        {{ get(item, 'ext.kf_team_remarks') ? get(item, 'ext.kf_team_remarks') : get(item, 'nickname') }}
                    </template>
                    <template #avatar>
                        <a-avatar :src="get(item, 'avatar')"/>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from '@/store';
import { debounce, get } from 'lodash-es';
import { useRouter } from 'vue-router';
import { apiMiscChatFindUser } from '@/services/pc';

const store = useStore();
const router = useRouter();
const trans = reactive({
    loading: false,
    type: 'user',
    kw: '',
    // 当前选中的 SessionId
    tid: computed(() => store.state.pc.tid),
    users: []
})

const desc = function (item: any) {
    let str = '';
    str += get(item, 'type') === 'chat' ? '聊天 ' : '订单 '
    str += get(item, 'type') === 'chat' ? `ID : ${get(item, 'account_id')}` : `ID : ${get(item, 'order_id')}`;
    return str;
}

// 创建防抖函数
const onSearch = debounce(function (e) {
    if (!trans.kw) {
        trans.users = [];
        return;
    }
    trans.loading = true;
    apiMiscChatFindUser({
        type: trans.type,
        keyword: trans.kw
    }).then(({ data }) => {
        trans.loading = false;
        trans.users = get(data, 'list', []);
    })
}, 300, {
    'leading': false,
    'trailing': true
})

watch(() => trans.kw, (newVal) => {
    if (!newVal) {
        store.dispatch('pc/ImLeaveSearch')
    } else {
        store.dispatch('pc/ImAtSearch')
    }
})

const onSelectTid = (tid: any) => {
    trans.kw = '';
    // 非当前路由, 切换路由
    router.replace({
        name: 'pc.chat',
        params: { tid }
    });
    store.dispatch('pc/ImSession', {
        tid: tid
    })
}

</script>

<style lang="less">
.recent-search {
    .el-input__inner {
        height: 32px;
    }
}

.el-avatar {
    background: #FFF;
}
</style>

<style scoped lang="less">
.search {
    padding: 12px 8px 12px 10px;
    .ant-input {
        border-radius: 4px;
    }
    ::v-deep.el-input__inner {
        height: 32px;
    }
    .ant-input-affix-wrapper-focused {
        border-color:var(--pc-color-theme);
        box-shadow: none;
    }
}

.el-avatar {
    background: var(--k-color-white);
}
</style>
