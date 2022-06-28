<template>
    <div class="x--pc-ic">
        <div class="time" v-if="timestamp">{{ formatUnixTimestamp(timestamp) }}</div>
        <div :class="{self:isSelf, other: !isSelf, content:true}">
            <div v-if="!isSelf">
                <img class="avatar-left" :src="avatar" :alt="nickname">
            </div>

            <div style="display: flex">
                <ImMsgStatus v-if="isSelf" :type="data.content.is_recall" :msg_id="id"/>
                <ImMsgReadStatus v-if="isSelf" :type="data.content.is_recall" :read-status="data.content.read_status"/>
                <div class="talk">
                    <div class="nickname" v-if="!isSelf">
                        <span v-html="remark"></span>
                        {{ nickname }}
                    </div>
                    <div class="talk-body">
                        <el-image :lazy="true" class="thumb" :src="ossImage(trans.body.url, 1080)" :initial-index="indexOf(list, ossImage(trans.body.url, 1080))" :preview-src-list="list"/>
                    </div>
                </div>
                <ImMsgStatus v-if="!isSelf" :type="data.content.is_recall" :msg_id="id"/>
            </div>
            <div v-if="isSelf">
                <img class="avatar-right" :src="avatar" :alt="nickname">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore } from '@/store';
import { get, indexOf } from 'lodash-es';
import { formatUnixTimestamp, ossImage } from '@/utils/utils';
import ImMsgStatus from '@/components/pc/im-msg/ImMsgStatus.vue';
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
