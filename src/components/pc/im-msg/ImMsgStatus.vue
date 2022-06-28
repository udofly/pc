<!--已撤回 等-->
<template>
    <div class="flex-column" style="justify-content: end;cursor: pointer;">
        <ImMsgBack class="im-status" v-if="type === 0" :msg_id="msg_id"/>
        <div v-if="type === 1" class="div-back-ed">已撤回</div>
    </div>
</template>

<script lang="ts" setup>

import ImMsgBack from '@/components/pc/im-msg/ImMsgBack.vue';

const props = defineProps({
    type: String,
    msg_id:String
})

</script>

<style scoped lang="less">


.div-back-ed {
    height: 21px;
    font-size: 12px;
    color: #AEAEAE;
}


</style>
