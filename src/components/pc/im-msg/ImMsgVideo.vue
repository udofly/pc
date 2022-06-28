<template>
    <div class="x--pc-ic">
        <div class="time" v-if="timestamp">{{ formatUnixTimestamp(timestamp) }}</div>
        <div :class="{self:isSelf, other: !isSelf, content:true}">
            <div v-if="!isSelf">
                <img class="avatar-left" :src="avatar" :alt="nickname">
            </div>
            <ImMsgStatus v-if="isSelf" :type="data.content.is_recall" :msg_id="id"/>
            <ImMsgReadStatus v-if="isSelf" :type="data.content.is_recall" :read-status="data.content.read_status"/>
            <div class="talk">
                <div class="nickname" v-if="!isSelf">
                    <span v-html="remark"></span>
                    {{ nickname }}
                </div>

                <div class="talk-body">
                    <div style="position: relative;">
                        <img
                            class="talk-body-img"
                            style="max-height: 192px;max-width: 245px;object-fit: contain;"
                            :src="ossVideo(trans.body.url, 750)"
                        />
                        <img :src="playImg"
                            style="width: 30px;height: 30px;position: absolute;top:0;left:0;right: 0;bottom: 0;margin: auto;"
                            @click="playPause(trans.body.url)"
                        />
                    </div>
                </div>
            </div>
            <ImMsgStatus v-if="!isSelf" :type="data.content.is_recall" :msg_id="id"/>

            <div v-if="isSelf">
                <img class="avatar-right" :src="avatar" :alt="nickname">
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import { formatUnixTimestamp, ossImage,ossVideo } from '@/utils/utils';
import ImMsgStatus from '@/components/pc/im-msg/ImMsgStatus.vue';
import  playImg from "@/assets/imgsCom/play_video.png";
import ImMsgReadStatus from '@/components/pc/im-msg/ImMsgReadStatus.vue';

const props = defineProps({
    id: String,
    timestamp: Number,
    list: Array,
    data: Object
})
const store = useStore();
const trans = reactive({
    body: computed(() => JSON.parse(get(props, 'data.content.body')))
})
const nickname = get(props, 'data.from.name');
const avatar = get(props, 'data.from.icon');

const isSelf = computed(() => {
    return get(store.state.pc, 'imUser.uid') === get(props, 'data.from.uid')
});
const remark = computed(() => {
    let ext = get(store.state.pc.session, 'opposite_info.ext');
    if (ext) {
        let extObj = JSON.parse(ext);
        if (get(props, 'data.from.uid') === extObj.buyer_accid) {
            return '<span class="ic-buyer">' + extObj.buyer_remarks + '</span>'
        }
        if (get(props, 'data.from.uid') === extObj.seller_accid) {
            return '<span class="ic-seller">' + extObj.seller_remarks + '</span>'
        }
    }
    return ''
});

const emit = defineEmits(["videoClick"]);
const playPause = (url:string) => {
    emit('videoClick',url);
};
</script>

<style scoped lang="less">

.talk-body {
    padding: 0 !important;
    max-width: 360px;
    overflow: hidden;
    img {
        max-width: 100%;
    }
    .thumb {
        display: block;
    }
}
</style>
