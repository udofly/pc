<template>
    <div class="div-read im-read_status">
        <div v-if="type === 0">{{ readStatus }}</div>
    </div>
</template>

<script lang="ts" setup>

import { watch } from 'vue';

const props = defineProps({
    type: String,//是否撤回  0"未撤回  1:已撤回
    isRead: Boolean,
    readStatus: {
        default: '未读',
        type: String
    }
})

watch(() => props.readStatus, (newVal) => {
    console.log('readStatus = ' + newVal)
})

</script>

<style scoped lang="less">


.div-read {
    font-size: 12px;
    color: #AEAEAE;
    display: flex;
    flex-direction: column;
    justify-content: end
}


</style>
