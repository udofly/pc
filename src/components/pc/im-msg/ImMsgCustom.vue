<template>

    <im-msg-custom-goods-info v-if="template==='goodsInfo'" :from="from" :body="parsed" :content="content" :time="time"/>
    <im-msg-custom-mini-notice v-if="template==='miniNotice'" :from="from" :body="parsed" :content="content" :time="time"/>
    <im-msg-custom-only-title-jump v-if="template==='onlyTitleJump'" :from="from" :body="parsed" :content="content" :time="time" :id="id"/>
    <im-msg-custom-title-content v-if="template==='titleContentJump'" :from="from" :body="parsed" :content="content" :time="time"/>
    <im-msg-custom-title-content-no-jump v-if="template==='titleContentNotJump'" :from="from" :body="parsed" :content="content"
        :time="time"/>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es';
import { formatUnixTimestamp } from '@/utils/utils';
import ImMsgCustomGoodsInfo from '@/components/pc/im-msg/ImMsgCustomGoodsInfo.vue';
import ImMsgCustomMiniNotice from '@/components/pc/im-msg/ImMsgCustomMiniNotice.vue';
import ImMsgCustomOnlyTitleJump from '@/components/pc/im-msg/ImMsgCustomOnlyTitleJump.vue';
import ImMsgCustomTitleContent from '@/components/pc/im-msg/ImMsgCustomTitleContent.vue';
import ImMsgCustomTitleContentNoJump from '@/components/pc/im-msg/ImMsgCustomTitleContentNoJump.vue';

const props = defineProps({
    id: String,
    timestamp: Number,
    data: Object
});
const body = get(props, 'data.content.body');
const from = get(props, 'data.from');
const content = get(props, 'data.content');
const time = formatUnixTimestamp(props.timestamp);

let parsed = {};
let template = '';
if (body) {
    parsed = JSON.parse(body);
    template = get(parsed, 'template');
}
</script>