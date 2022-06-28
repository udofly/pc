<template>
    <div class="x--pc-ic">
        <div class="time" v-if="timestamp">{{ formatUnixTimestamp(timestamp) }}</div>
        <div :class="{self:isSelf, other: !isSelf, content:true}">

            <div v-if="!isSelf">
                <img class="avatar-left" :src="avatar" :alt="nickname">
            </div>

            <div class="talk">
                <div class="nickname" v-if="!isSelf">
                    <span v-html="remark"></span>
                    {{ data.from.name }}
                </div>
               <div style="display: flex">
                   <ImMsgStatus v-if="isSelf" :type="data.content.is_recall" :msg_id="id"/>
                   <ImMsgReadStatus v-if="isSelf" :type="data.content.is_recall" :read-status="data.content.read_status"/>
                   <div class="talk-body" v-html="data.content.body"/>
                   <ImMsgStatus v-if="!isSelf" :type="data.content.is_recall" :msg_id="id"/>
               </div>
            </div>


            <div v-if="isSelf">
                <img class="avatar-right" :src="avatar" :alt="nickname">
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { get } from 'lodash-es';
import { computed, h, onMounted, reactive } from 'vue';
import { formatUnixTimestamp } from '@/utils/utils';
import ImMsgStatus from '@/components/pc/im-msg/ImMsgStatus.vue';
import ImMsgReadStatus from '@/components/pc/im-msg/ImMsgReadStatus.vue';

const props = defineProps({
    id: String,
    timestamp: Number,
    data: Object
})

const store = useStore();

const trans = reactive({
    session: computed(() => store.state.pc.session)
})

const nickname = get(props, 'data.from.name');
const avatar = get(props, 'data.from.icon');
const isSelf = computed(() => {
    return get(store.state.pc, 'imUser.uid') === get(props, 'data.from.uid')
});

const remark = computed(() => {
    let ext = get(store.state.pc.session, 'opposite_info.ext');
    // let session = get(store.state.pc,'session');
    // console.log("opposite_info = "+JSON.stringify(session))
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


</style>
