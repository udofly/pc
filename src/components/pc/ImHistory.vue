<template>
    <el-scrollbar :ref="(el) => refList = el" class="container" @scroll="onScroll" v-if="value.tid">
        <div class="more" v-if="!isFinished">
            <a-spin v-if="isLoadingMore"/>
            <a-button v-else type="link" @click="onLoad">加载更多</a-button>
        </div>
        <div class="more" v-else>
            没有更多
        </div>
        <a-list :loading="isLoading" :locale="{emptyText: '无会话内容'}">
            <template v-for="(item) in orderedList" :key="get(item, 'msg_id')">
                <im-msg-text v-if="get(item,'data.content.type') === 0" :key="get(item, 'msg_id')"
                    :id="get(item,'msg_id')" :timestamp="get(item,'timestamp')"
                    :data="get(item,'data')"
                />
                <im-msg-image v-if="get(item,'data.content.type') === 1" :key="get(item, 'msg_id')" :list="imageList"
                    :id="get(item,'msg_id')" :timestamp="get(item,'timestamp')"
                    :data="get(item,'data')"
                />
                <im-msg-video v-if="get(item,'data.content.type') === 3" :key="get(item, 'msg_id')" :list="imageList"
                    :id="get(item,'msg_id')" :timestamp="get(item,'timestamp')"
                    :data="get(item,'data')"
                    @videoClick="playPause"
                />
                <im-msg-custom v-if="get(item,'data.content.type') === 100" :key="get(item, 'msg_id')"
                    :id="get(item,'msg_id')" :timestamp="get(item,'timestamp')"
                    :data="get(item,'data')"
                />
            </template>
        </a-list>
    </el-scrollbar>
    <el-empty v-else description="请在左侧选择用户或订单"></el-empty>


    <el-dialog title="视频"
        width="calc(100vh * 2/3)"
        center
        v-model="videoInfo.show"
        @close="onVideoClose">
        <video
            :src="videoInfo.url"
            style="width: 100%;height:calc(100vh * 2/3);"
            autoplay
            controls
        />
    </el-dialog>

</template>

<script lang="ts" setup>
import { debounce, each, find, first, forEach, get, sortBy } from 'lodash-es';
import { computed, nextTick, onUnmounted, reactive, ref, watch } from 'vue';
import { useStore } from '@/store';
import { apiImClientMessageHistory } from '@/services/im';
import ImMsgText from '@/components/pc/im-msg/ImMsgText.vue';
import ImMsgImage from '@/components/pc/im-msg/ImMsgImage.vue';
import ImMsgCustom from '@/components/pc/im-msg/ImMsgCustom.vue';
import ImMsgVideo from '@/components/pc/im-msg/ImMsgVideo.vue';
import { appSessionStore, ossImage } from '@/utils/utils';
import { storageKey } from '@/utils/conf';
import {emitter} from "@popjs/core/bus/mitt";
import { EM_PC_CALL_MESSAGE, EM_PC_CALL_NOREADMESSAGE, EM_PC_READ_MESSAGE, EM_PC_RECEIVE_READ_MESSAGE } from "@/utils/socket";

const store = useStore();
const refList = ref()
let isLoading = ref(false);
let isLoadingMore = ref(false);
let isEmpty = ref(false);
let isFinished = ref(false);
let list = ref([]);
let isNoRead = ref(false);
let orderedList = computed(() => {
    return sortBy(list.value, function (sess) {
        return get(sess, 'timestamp');
    })
})
const trans = reactive({
    pcUserAccid: computed(() => get(appSessionStore(storageKey.PC_USER), 'im_accid'))
})

const videoInfo = reactive({ show: false, url: '' });

const playPause = (url: string) => {
    videoInfo.show = true;
    videoInfo.url = url;
};
const onVideoClose = () => {
    videoInfo.show = false;
    videoInfo.url = '';
};

let imageList = computed(() => {
    let url: any = [];
    each(orderedList.value, function (sess) {
        if (get(sess, 'data.content.type') === 1) {
            let body = JSON.parse(get(sess, 'data.content.body'));
            url.push(ossImage(body.url, 1080));
        }
    })
    return url;
})
const value = reactive({
    max_id: 0,
    tid: '',
    type: 1
})

//收到撤回的通知
emitter.on(EM_PC_CALL_MESSAGE, function (msg_id) {
    store.dispatch('pc/ImEmit', {
        action: 'action',
        message: {
            action: 'messageRecall',
            data: {
                msg_id: msg_id
            }
        },
        callback: (resp) => {
            // 操作成功
            if (get(resp, 'status') === 0) {
                let result = resp.data;
                let contain = find(orderedList.value, function (item) {
                    return get(item, 'msg_id') === get(result, 'msg_id');
                });
                if (contain) {
                    contain.data.content.is_recall = get(result, 'is_recall')
                }
            }
        }
    })
})
//收到已读的通知
emitter.on(EM_PC_RECEIVE_READ_MESSAGE, function (data) {
    let ext = get(store.state.pc.session, 'opposite_info.ext');
    let session_id = get(store.state.pc.session, 'session_id');
    if (session_id != get(data, 'data.session_id')) {
        // console.log('不相等')
        return
    }
    forEach(get(data, 'data.reads'), (reads_item) => {
        let contain = find(orderedList.value, function (item) {
            return get(item, 'msg_id') === get(reads_item,'message_id');
        });
        if (contain) {
            // console.log("get(reads_item, 'users') = "+JSON.stringify(get(reads_item, 'users')))
            contain.data.content.read_status = getReadStatusDesc(ext, get(reads_item, 'users'));
        }
    })
})

//已读回执
emitter.on(EM_PC_READ_MESSAGE, function (data) {
    if (trans.pcUserAccid === get(data, 'data.content.from')) {
        return
    }
    if (get(data, 'data.content.to') !== value.tid) {
        return
    }
    store.dispatch('pc/ImEmit', {
        action: 'action',
        message: {
            action: 'messageRead',
            data: {
                msg_id: get(data, 'msg_id'),
                ope: '1'
            }
        },
        callback: (resp) => {
            // console.log("已读回执")
        }
    })
})

const offBus = () => {
    emitter.off(EM_PC_CALL_MESSAGE)
}

onUnmounted(offBus)

const getReadStatusDesc = function (ext, reads) {

    if (!reads || reads.length == 0) {
        return '未读'
    }
    if (!ext) {
        return '已读'
    }
    let extObj = JSON.parse(ext);
    if ('order' === extObj.team_type) {
        let read_status_desc = '';
        if (reads.length >= 2) {
            read_status_desc = '全部已读'
        } else {
            let read_id = reads[0];
            if (read_id === get(extObj, 'buyer_accid')) {
                read_status_desc = '买家已读'
            } else if (read_id === get(extObj, 'seller_accid')) {
                read_status_desc = '卖家已读'
            }
        }
        return read_status_desc;
    } else if ('chat' === extObj.team_type) {
        return '已读'
    }
}

watch(() => store.state.pc.tid, (newVal) => {
    value.tid = newVal;
    onRefresh();
})
watch(() => store.state.pc.message, (newVal: any) => {
    // console.log("newVal -= "+JSON.stringify(newVal))
    let isSelf = get(store.state.pc, 'imUser.uid') === get(newVal, 'data.from.uid')
    list.value.push(newVal);
    if (isSelf) {
        scrollToBottom()
    }
    nextTick(() => {
        let scrollHeight = refList.value.wrap$.scrollHeight;
        let clientHeight = refList.value.wrap$.clientHeight;
        let scrollTop = refList.value.wrap$.scrollTop;
        let off = scrollHeight - clientHeight;
        if (off > scrollTop) {
            isNoRead.value = true;
            emitter.emit(EM_PC_CALL_NOREADMESSAGE, true)
        } else {
            isNoRead.value = false;
            emitter.emit(EM_PC_CALL_NOREADMESSAGE, false)
        }
    });
})

const onRefresh = function () {
    isFinished.value = false;
    isLoading.value = false;
    isLoadingMore.value = false;
    isEmpty.value = false;
    list.value = [];
    value.max_id = 0;
    isFinished.value = false;
    onLoad();
}
// 这里进行多页加载
const onLoad = function () {
    isLoadingMore.value = true;

    apiImClientMessageHistory({
        ...value
    }).then(({ data }) => {
        let ls = get(data, 'list', []);

        forEach(ls, (item) => {
            let reads = get(item, 'data.reads');
            let ext = get(store.state.pc.session, 'opposite_info.ext');
            item.data.content.read_status = getReadStatusDesc(ext, reads);
        })

        // stop loading
        isLoading.value = false
        isLoadingMore.value = false

        // 第一页且无数据
        if (!value.max_id && ls.length === 0) {
            isEmpty.value = true;
            list.value = [];
            isFinished.value = true;
            return;
        }

        // 最后一页无数据
        if (ls.length === 0) {
            isFinished.value = true;
        }


        // 暂时不支持刷新
        if (!value.max_id) {
            list.value = ls;
            // 加载完成之后将页面重置到底部
            scrollToBottom();

        } else {
            list.value = list.value.concat(ls);
            /* stip 设置滚动到一定位置暂停
             * ---------------------------------------- */
            let offset = refList.value.wrap$.scrollHeight;
            nextTick(() => {
                // 底部内容的高度
                refList.value.setScrollTop(refList.value.wrap$.scrollHeight - offset);
            });
        }

        // 下一页请求的 Max ID
        if (ls.length) {
            let firstEle = first(ls);
            value.max_id = get(firstEle, 'msg_id');
        }
    })
}


const onScroll = debounce(function (e: any) {
    if (isLoading.value) {
        return false;
    }
    const scrollTop = get(e, 'scrollTop')
    if (scrollTop < 20) {
        onLoad()
    }

    if (isNoRead.value) {
        let scrollHeight = refList.value.wrap$.scrollHeight;
        let clientHeight = refList.value.wrap$.clientHeight;
        let scrollTop = refList.value.wrap$.scrollTop;
        let off = scrollHeight - clientHeight;
        if (off === scrollTop) {
            isNoRead.value = false;
            emitter.emit(EM_PC_CALL_NOREADMESSAGE, false)
        }
    }
}, 200, {
    leading: false,
    trailing: true
})

const scrollToBottom = function () {
    nextTick(() => {
        refList.value.setScrollTop(refList.value.wrap$.scrollHeight);
    })
}

</script>

<style scoped lang="less">

.container {
    overflow-y: auto;
    height: calc(100vh - 200px)
}

.more {
    text-align: center;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
}
</style>
