<template>
    <el-button size="small" class="btn" @click="onClick" v-if="visible">
        {{ title }}
    </el-button>
    <im-frame v-model:visible="trans.visible" :title="title" :url="url"/>

    <a-modal cancel-text="取消" ok-text="确定"
        v-model:visible="trans.isSwapVisible" @ok="onConfirm"
        title="提示">
        <p style="text-align: center">{{ trans.swapMsg }}</p>
    </a-modal>
</template>

<script lang="ts" setup>
import ImFrame from '@/components/pc/ImFrame.vue';
import { reactive } from 'vue';
import { pcToast } from '@/utils/pc';
import { apiMiscRecord, apiSwapCheck } from '@/services/pc';

const props = defineProps({
    url: String,
    visible: Boolean,
    ban: Boolean,
    title: String,
    orderId: {
        type: Number,
        default: 0
    }
})

const trans = reactive({
    visible: false,
    isSwapVisible: false,//是否展示换绑提示
    swapMsg: ''//换绑提示

})
const onClick = () => {
    if (props.ban) {
        pcToast('该订单已' + props.title, false);
        return;
    }
    if ('查看包赔' === props.title) {
        apiMiscRecord({ source: 'ensure', order_id: props.orderId }).then()
    }
    if ('换绑完成' === props.title) {
        apiSwapCheck({
            order_id: props.orderId
        }).then(({ success, message }) => {
            if (success) {
                trans.visible = true
            } else {
                trans.isSwapVisible = true
                trans.swapMsg = message
            }
        })
    } else {
        trans.visible = true
    }

}
const onConfirm = function () {
    trans.visible = true
    trans.isSwapVisible = false
}
</script>
<style scoped lang="less">

.btn {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}
</style>
