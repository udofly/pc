<template>
    <el-button size="small" @click="onFillIndemnity" class="btn" v-if="visible">
        填写包赔
    </el-button>

    <a-modal cancel-text="取消" ok-text="确定"
        v-model:visible="isVisible" @ok="onConfirm"
        title="包赔材料模板">
        <template v-slot:footer style="height: 10px">
            <div></div>
        </template>


        <div style="border: 1px solid var(--pc-color-text-light)">
            <div class="data-title">
                <span style="width:75%;padding-top: 6px;">内容</span>
                <div style="background-color: var(--pc-color-text-light);width: 1px"></div>
                <span style="width:25%;padding-top: 6px;">操作</span>
            </div>

            <div v-for="item in trans.dataSource" :key="item">
                <div style="height: 1px;background-color: var(--pc-color-text-light)"></div>
                <div class="data-title" style="background-color:var(--k-color-white) ">
                    <span style="width:75%;padding-top: 6px;">{{ item.title }}</span>
                    <div style="background-color:var(--pc-color-text-light);width: 1px"></div>
                    <span style="width:25%;padding-top: 6px;cursor: pointer" @click="onSend(item.id)">发送</span>
                </div>
            </div>
        </div>

    </a-modal>


</template>

<script lang="ts" setup>
import { apiMiscChatInviteEnsureIndemnity, apiMiscChatInviteFillIndemnity } from '@/services/pc';
import { pcToast } from '@/utils/pc';
import { reactive, ref } from 'vue';
import { forEach } from 'lodash-es';

const props = defineProps({
    orderId: Number,
    visible: Boolean,
    identity: String
})

const trans = reactive({
    visible: false,
    dataSource: []
})

const onConfirm = function () {
}
const isVisible = ref(false);
const onSend = function (id: Number) {
    apiMiscChatInviteFillIndemnity({
        order_id: props.orderId,
        template_id: id
    }).then(({ success, message }) => {
        if (success) {
            isVisible.value = false
        }
        pcToast(message, success);
    })
}
const onFillIndemnity = function () {
    if (props.identity === 'enterprise') {
        pcToast('卖家是商户，无须填写包赔', false);
        return;
    }
    apiMiscChatInviteEnsureIndemnity().then(({ success, message, data }) => {
        if (success) {
            trans.dataSource = data;
            isVisible.value = true;
        } else {
            pcToast(message, success);
        }
    })

}
</script>
<!--<style lang="less">-->
<!--.ant-modal-footer {-->
<!--    padding: 0;-->
<!--    height: 10px;-->
<!--    border-top: 0px;-->
<!--}-->
<!--</style>-->


<style scoped lang="less">

//.ant-modal-footer {
//    padding: 0;
//    height: 10px;
//    border-top: 0px;
//}

.btn {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}


.data-title {
    width: auto;
    display: flex;
    font-size: 14px;
    min-height: 35px;
    background-color: var(--pc-color-bg-main);
    justify-content: space-around;
    span {
        display: inline-block;
        text-align: center;
    }
}
</style>
