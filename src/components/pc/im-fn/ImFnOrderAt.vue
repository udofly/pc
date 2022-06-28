<template>
    <el-button size="small" @click="onAtUser" class="btn" v-if="type === 'buyer'">
        @买家
    </el-button>
    <el-button size="small" @click="onAtUser" class="btn" v-if="type === 'seller'">
        @卖家
    </el-button>
</template>

<script lang="ts" setup>
import { apiMiscChatSendAtMessage } from '@/services/pc';
import { pcToast } from '@/utils/pc';
import { reactive } from 'vue';

const props = defineProps({
    tid: String,
    type: String
})

const trans = reactive({
    visible: false
})

const onAtUser = function () {
    apiMiscChatSendAtMessage({
        im_tid: props.tid,
        user_type: props.type
    }).then(({ success, message }) => {
        pcToast(message, success);
    })
}
</script>
<style scoped lang="less">

.btn {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}
</style>
