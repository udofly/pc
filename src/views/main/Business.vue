<template>
    <div class="business-content">

        <div class="business-center-content">
            <BusinessTrade v-if="trans.indexBusiness ==='账号交易'" :index-main="trans.indexMain"/>
            <BusinessFriend v-if="trans.indexBusiness ==='开黑交友'" :index-main="trans.indexMain"/>
            <BusinessOrder v-if="trans.indexBusiness ==='订单分发'" :index-main="trans.indexMain"/>
            <BusinessOperation v-if="trans.indexBusiness ==='媒体运营'" :index-main="trans.indexMain"/>
        </div>

        <div class="business-bottom px--flex-row flex-center">
            <img class="img-line" src="@/assets/img/business/ic_business_line.png"/>


            <ElTabs class="business--tabs" v-model="trans.indexBusiness" @tab-click="onTabChange">
                <ElTabPane label="账号交易" name="账号交易"></ElTabPane>
                <ElTabPane label="开黑交友" name="开黑交友"></ElTabPane>
                <ElTabPane label="订单分发" name="订单分发"></ElTabPane>
                <ElTabPane label="媒体运营" name="媒体运营"></ElTabPane>
            </ElTabs>

            <img class="img-line" src="@/assets/img/business/ic_business_line.png"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

//tab切换事件
import BusinessTrade from '@/views/main/BusinessTrade.vue';
import BusinessFriend from '@/views/main/BusinessFriend.vue';
import BusinessOrder from '@/views/main/BusinessOrder.vue';
import BusinessOperation from '@/views/main/BusinessOperation.vue';
import { defineProps, reactive, watch } from 'vue';

const props = defineProps({
    indexMain: {//外层的index
        type: Number,
        default: 0
    }
})

const trans = reactive({
    indexMain: props.indexMain,
    indexBusiness: '账号交易'
})

watch(() => props.indexMain, (newVal) => {
    trans.indexMain = newVal;
})

const onTabChange = function (e) {
    console.log(e.props.name)
    trans.indexBusiness = e.props.name;
}

</script>


<style scoped lang="less">
@import '../../assets/style/style';

.business-content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.business-center-content {
    display: flex;
    justify-content: center;
    flex: 1;
    z-index: 20;
}

.business-bottom {
    margin-bottom: 30px;
    z-index: 20;
}

.img-line {
    width: 177px;
    height: 1px;
    margin-bottom: 10px;
}

</style>
