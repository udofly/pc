<template class="sms">
    <img v-if="!showMobile&&type==='user'" src="../../../assets/imgsCom/pwd_eye.png" alt="电话" class="img-eye" @click="onClickEye"/>
    <img v-if="!showMobile&&type==='order'" src="../../../assets/imgsCom/pwd_eye_gray.png" alt="电话" class="img-eye" @click="onClickEye"/>
    <span v-if="showMobile">{{ mobile }}</span>
    <a @click="onFillIndemnity" class="btn">短信</a>
    <a-modal
        v-model:visible="isVisible" @ok="onConfirm"
        title="短信发送">
        <template v-slot:footer style="height: 10px">
            <div></div>
        </template>
        <div style="border: 1px solid #ABA4A4">
            <div class="data-title">
                <span style="width:75%;padding-top: 6px;">内容</span>
                <div style="background-color: #ABA4A4;width: 1px"></div>
                <span style="width:25%;padding-top: 6px;">操作</span>
            </div>

            <div v-for="item in trans.dataSource" :key="item">
                <div style="height: 1px;background-color: #ABA4A4 "></div>
                <div class="data-title" style="background-color:var(--k-color-white) ">
                    <span style="width:75%;padding-top: 6px;">{{ item.content }}</span>
                    <div style="background-color: #ABA4A4;width: 1px"></div>
                    <span style="width:25%;padding-top: 6px;cursor: pointer" @click="onSend(item.type)">发送</span>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { apiMiscRecord, apiMiscSMSList, apiMiscSMSSend } from '@/services/pc';
import { pcToast } from '@/utils/pc';
import { reactive, ref } from 'vue';

const props = defineProps({
    showMobile: {
        type: Boolean,
        default: false
    },
    mobile: String,
    type: String, //订单?用户
    accountId: {   //用户id
        type: Number,
        default: 0
    }
})

const trans = reactive({
    dataSource: []
})
const emits = defineEmits(['clickEye'])
const onConfirm = function () {
}
const isVisible = ref(false);
const onSend = function (type: String) {
    apiMiscSMSSend({
        mobile: props.mobile,
        type: type
    }).then(({ success, message }) => {
        if (success) {
            isVisible.value = false
        }
        pcToast(message, success);
    })
}
const onFillIndemnity = function () {
    apiMiscSMSList().then(({ success, message, data }) => {
        if (success) {
            trans.dataSource = data;
            isVisible.value = true;
        } else {
            pcToast(message, success);
        }
    })

}
const onClickEye = function () {
    emits('clickEye');
    apiMiscRecord({ source: 'mobile', account_id: props.accountId }).then()
}

</script>


<style scoped lang="less">

.sms {
    display: flex;
    justify-content: space-between;
}

.img-eye {
    width: 16px;
    height: 16px;
}

.btn {
    display: inline-block;
    width: 32px;
    border-radius: 3px;
    text-align: center;
    height: 16px;
    font-size: 5px;
    line-height: 15px;
    margin-left: 3px;
    color: var(--k-color-white);
    border: 1px solid var(--k-color-white);
    background-color: var(--pc-color-theme);
    cursor: pointer;
}


.data-title {
    width: auto;
    display: flex;
    font-size: 14px;
    min-height: 35px;
    background-color: #F1EEEE;
    justify-content: space-around;
    span {
        display: inline-block;
        text-align: center;
    }
}
</style>
