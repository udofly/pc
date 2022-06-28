<template>
    <el-row>
        <el-col :span="5">
            <im-recent/>
        </el-col>
        <el-col :span="11">
            <im-header/>
            <div class="chat-content" :ref="(el)=>main = el">
                <im-history/>
                <im-msg-video-status class="videoStatus" v-show="videoStatus"/>
                <div class="read" v-show="isNoRead">未读消息</div>
                <div class="input">
                    <pc-im-input/>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <el-row>
                <el-col :span="12">
                    <im-fn-order v-if="trans.type === 'order'"/>
                    <im-fn-user v-if="trans.type === 'chat'"/>
                    <im-fn-empty v-if="!trans.tid"/>
                </el-col>
                <el-col :span="12">
                    <im-fn-phase :type="trans.type === 'order'?'order':'user'"/>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { find, get } from 'lodash-es';
import ImRecent from '@/components/pc/ImRecent.vue';
import { useStore } from '@/store';
import { usePcSocket } from '@/composables/usePcSocket';
import PcImInput from '@/components/pc/ImInput.vue';
import ImHeader from '@/components/pc/ImHeader.vue';
import ImFnOrder from '@/components/pc/im-fn/ImFnOrder.vue';
import ImFnUser from '@/components/pc/im-fn/ImFnUser.vue';
import ImFnPhase from '@/components/pc/im-fn/ImFnPhase.vue';
import ImHistory from '@/components/pc/ImHistory.vue';
import router from '@/router';
import ImFnEmpty from '@/components/pc/im-fn/ImFnEmpty.vue';
import { emitter } from '@popjs/core/bus/mitt';
import { EM_PC_CALL_NOREADMESSAGE, EM_PC_REFRESH_SHORT_MSG, EM_PC_VIDEO_SEND, EM_PC_VIDEO_SEND_FAILURE, EM_PC_VIDEO_SEND_SUCCESS } from '@/utils/socket';
import { imMsgVideo, pcToast } from '@/utils/pc';
import ImMsgVideoStatus from '@/components/pc/ImMsgVideoStatus.vue';
import { appTitle } from "@/utils/conf";

const main = ref(null);
const videoStatus = ref(false);

usePcSocket();
const store = useStore();
let blink: any = null;
const trans = reactive({
    tid: computed(() => store.state.pc.tid),
    type: computed(() => store.state.pc.sessionType),
    session: computed(() => {
        return store.state.pc.session
    }),
    videoList: []
})

let isNoRead = ref(false);

watch(() => trans.tid, (newVal) => {
    let contain = find(trans.videoList, function (item) {
        return get(item, 'tid') === newVal;
    });
    if (contain) {
        videoStatus.value = true;
    } else {
        videoStatus.value = false;
    }
})

//
emitter.on(EM_PC_CALL_NOREADMESSAGE, function (isShow) {
    isNoRead.value = isShow;
})

//视频发送
emitter.on(EM_PC_VIDEO_SEND, function (obj) {
    if (obj.tid === trans.tid) {
        videoStatus.value = true;
    } else {
        videoStatus.value = false;
    }
    trans.videoList.push(obj);
});

//视频发送成功
emitter.on(EM_PC_VIDEO_SEND_SUCCESS, function (obj) {
    let contain = find(trans.videoList, function (item) {
        return (get(item, 'tid') === obj.tid && get(item, "url") === obj.url);
    });

    if (contain) {
        store.dispatch('pc/ImEmit', {
            action: 'chat',
            message: imMsgVideo(contain.uid, contain.tid, contain.url)
        })
        trans.videoList.splice(trans.videoList.indexOf(contain), 1);
    }

    if (obj.tid === trans.tid) {
        videoStatus.value = false;
    }
});

//视频发送失败
emitter.on(EM_PC_VIDEO_SEND_FAILURE, function (obj) {

    let contain = find(trans.videoList, function (item) {
        return (get(item, 'tid') === obj.tid && get(item, "url") === obj.url);
    });
    if (contain) {
        trans.videoList.splice(trans.videoList.indexOf(contain), 1);
    }
    if (obj.tid === trans.tid) {
        pcToast('视频发送失败', false);
        videoStatus.value = false;
    }
});
const offBus = () => {
    emitter.off(EM_PC_CALL_NOREADMESSAGE)
    emitter.off(EM_PC_VIDEO_SEND);
    emitter.off(EM_PC_VIDEO_SEND_SUCCESS);
    emitter.off(EM_PC_VIDEO_SEND_FAILURE);
}

onUnmounted(offBus)


// 监听订单类型
watch(() => store.state.pc.session, () => {
    let session = store.state.pc.session

    let routeTid = get(router.currentRoute.value.params, 'tid');
    if (routeTid !== get(session, 'tid')) {
        router.replace({
            name: 'pc.chat',
            params: { tid: get(session, 'tid') }
        });
        emitter.emit(EM_PC_REFRESH_SHORT_MSG, trans.type)
    }
})

// 新消息提示
watch(() => store.state.pc.unReadNum, (newVal) => {
    if (newVal !== 0) {
        if (blink) {
            clearInterval(blink);
        }
        blink = setInterval(function () {
            document.title = document.title === appTitle ? `你有新消息 - ${appTitle}` : appTitle;
        }, 1000)
    } else {
        document.title = appTitle;
        blink && clearInterval(blink)
    }
})
</script>

<style scoped lang="less">


.chat-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 44px);
    border-right: 1px solid var(--k-color-bg-main);
    flex: 1;
    overflow: hidden;
    background: var(--k-color-bg-main);
    position: relative;
    .input {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}

.user {
    max-height: calc(100vh - 80px);
    overflow-y: auto;
}

.read {
    position: absolute;
    bottom: 148px;
    text-align: center;
    height: 20px;
    width: 100%;
}

.videoStatus {
    position: absolute;
    bottom: 158px;
    text-align: center;
    height: 20px;
    width: 100%;
}
</style>
