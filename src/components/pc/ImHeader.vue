<template>
    <div class="header x--pc-header">
        <div class="header-title" v-if="!trans.tid">
            &nbsp;
        </div>
        <div class="header-title" v-if="trans.tid">
            <span v-if="!trans.isEdit">{{ imKfRemark(get(trans.session, 'opposite_info')) }}</span>
            <el-input v-if="trans.isEdit" v-model="value.title" class="header-input" placeholder="请输入备注" size="small"
                @keyup.esc="trans.isEdit=false"
                @keyup.enter="onComment">
                <template #suffix>
                    <check-outlined class="header-check" @click="onComment"/> &nbsp;
                </template>
            </el-input>
            <icon-font v-if="!trans.isEdit" class="header-edit" type="icon-edit" @click="onEdit"/>
        </div>
        <div class="header-action" v-if="trans.tid">
            <el-button plain size="small" @click="trans.isVisible=true" class="btn-send">
                转接
            </el-button>
            <el-button plain size="small" @click="onSetTop" v-if="!get(trans.session, 'is_sticky')">
                设为置顶
            </el-button>
            <el-button plain type="primary" size="small" @click="onCancelTop" v-if="get(trans.session, 'is_sticky')">
                取消置顶
            </el-button>
        </div>
        <a-modal cancel-text="取消" ok-text="转接" :footer="null"
            v-model:visible="trans.isVisible" title="客服转接" @ok="onConfirm">
            <a-list :locale="{emptyText: '无在线客服'}" :data-source="trans.kfList">
                <template #renderItem="{ item }">
                    <a-list-item>
                        {{ get(item, 'nickname') }}
                        <template #actions>
                            <!-- stip 这里 click / click.alt 存在冲突 -->
                            <a-button size="small" @click="onConfirm(get(item, 'account_id'), true)">
                                转接
                            </a-button>
                        </template>
                    </a-list-item>
                </template>
            </a-list>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, reactive, watch } from 'vue';
import { clone, get, set } from 'lodash-es';
import { apiMiscChatTeamRemarks, apiPcKfOnlineList, apiPcUserDistributeKf } from '@/services/pc';
import { useStore } from '@/store';
import { imKfRemark, pcToast } from '@/utils/pc';
import IconFont from '@/components/base/IconFont';
import { CheckOutlined } from '@ant-design/icons-vue';

const store = useStore();
defineComponent({
    CheckOutlined
})
const trans = reactive({
    session: computed(() => {
        return store.state.pc.session
    }),
    isEdit: false,
    isVisible: false,
    kfList: [],
    uid: computed(() => store.state.pc.imAccid),
    tid: computed(() => store.state.pc.tid),
    loading: computed(() => store.getters.loading)
})

const value = reactive({
    title: ''
});

const onEdit = function () {
    trans.isEdit = true;
    value.title = imKfRemark(get(trans.session, 'opposite_info'))
}

const onComment = function () {
    if (!value.title) {
        pcToast('群昵称不能为空', false);
        return;
    }
    apiMiscChatTeamRemarks({
        im_tid: trans.tid,
        remarks: value.title
    }).then(({ success, message }) => {
        pcToast(message, success);
        trans.isEdit = false;
    })
}

// 设为置顶
const onSetTop = function () {
    store.dispatch('pc/ImEmit', {
        action: 'action',
        message: {
            action: 'sessionStickie',
            data: {
                session: store.state.pc.sessionId
            }
        },
        callback: (resp) => {
            // 操作成功
            if (get(resp, 'status') === 0) {
                const sess = clone(trans.session);
                set(sess, 'is_sticky', 1);
                store.dispatch('pc/ImRecent', [sess]);
                store.dispatch('pc/ImSetSession', sess);
            }
        }
    })
}
const onCancelTop = function () {
    store.dispatch('pc/ImEmit', {
        action: 'action',
        message: {
            action: 'sessionCancelStickie',
            data: {
                session: store.state.pc.sessionId
            }
        },
        callback: (resp) => {
            // 操作成功
            if (get(resp, 'status') === 0) {
                const sess = clone(trans.session);
                set(sess, 'is_sticky', 0);
                store.dispatch('pc/ImRecent', [sess]);
                store.dispatch('pc/ImSetSession', sess);
            }
        }
    })
}

// todo 这里转接之后的客服的操作需要确认
const onConfirm = function (kfId: any) {
    if (trans.loading) {
        return;
    }
    store.dispatch('Loading')
    apiPcUserDistributeKf({
        kf_id: kfId,
        im_tid: store.state.pc.tid
    }).then(({ success, message }) => {
        store.dispatch('Loaded')
        pcToast(message, success);
        if (success) {
            trans.isVisible = false;
        }
    })
}

const fetchList = async () => {
    apiPcKfOnlineList().then(({ success, data, message }) => {
        if (success) {
            trans.kfList = data
        } else {
            pcToast(message, success);
        }
    });
};

// 更改打开的时机
watch(
    () => trans.isVisible,
    (newVal) => {
        if (newVal) {
            fetchList();
        }
    }
)
watch(
    () => trans.tid,
    () => {
        trans.isEdit = false;
    }
)
</script>

<style scoped lang="less">
.header-title {
    font-weight: bold;
    padding-left: 14px;
    .anticon {
        font-size: 16px;
        position: relative;
        top: 1px;
        cursor: pointer;
    }
}

.header {
    background: var(--pc-color-bg-main);
    height: 44px;
    display: flex;
    border-bottom: 1px solid var(--pc-color-bg-main);
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 8px;
    .el-button {
        border: 1px solid var(--pc-color-theme);
        background: transparent;
        flex: 0;
        min-height: 22px;
        padding: 3px 6px;
        color: var(--pc-color-theme);
        &.el-button--primary {
            background: var(--pc-color-theme);
            color: var(--k-color-white);
        }
    }

}
</style>
