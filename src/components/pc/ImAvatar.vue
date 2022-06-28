<template>
    <div class="kf">
        <el-tooltip :content="notifyTip">
            <notification-outlined @click="onNotifyGranted" :class="{
                'kf-deny': trans.notify === Push.Permission.DENIED,
                'kf-default': trans.notify === Push.Permission.DEFAULT,
                'kf-granted': trans.notify === Push.Permission.GRANTED,
            }"/>
        </el-tooltip>
        <el-badge :type="trans.connected ? 'success' : 'warning'" is-dot class="badge">
            <img :src="get(trans.my, 'icon') ? get(trans.my, 'icon') : themeAssets('logo')" :alt="get(trans.my, 'name')">
        </el-badge>
        {{ trans.my.name }}
    </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive } from 'vue';
import { get } from 'lodash-es';
import { useStore } from '@/store';
import Push from 'push.js';
import { NotificationOutlined } from '@ant-design/icons-vue';
import { themeAssets } from "@/utils/utils";
const store = useStore();
const trans = reactive({
    notify: '',
    connected: computed(() => store.state.pc.imConnected),
    // 当前用户的IM信息
    my: computed(() => store.state.pc.imUser)
})
const notifyTip = computed(() => {
    if (trans.notify === Push.Permission.DEFAULT) {
        return '手动打开浏览器通知';
    }
    if (trans.notify === Push.Permission.DENIED) {
        return '当前非 https 模式或者禁用本站通知';
    }
    if (trans.notify === Push.Permission.GRANTED) {
        return '可以在浏览器设置中取消通知';
    }
    return '';
})

const onNotifyGranted = function () {
    Push.Permission.request(() => {
        trans.notify = Push.Permission.GRANTED
    }, () => {
        trans.notify = Push.Permission.DENIED
    })
}

// push 检查推送的权限
onMounted(() => {
    trans.notify = Push.Permission.get();
})
</script>

<style scoped lang="less">
.kf {
    padding: 20px;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    align-items: center;
    font-size: 16px;
    color: var(--pc-color-text-black);
    box-sizing: border-box;
    border-bottom: 1px solid var(--pc-color-bg-main);;
    img {
        height: 40px;
        width: 40px;
    }
    .badge {
        margin-right: 10px;

    }
    .anticon {
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
        &.kf-deny {
            color: red;
        }
        &.kf-granted {
            color: green;
        }
    }
}
</style>
