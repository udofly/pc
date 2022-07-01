<template>
    <div class="top-content" :class="{business_active:(trans.active==2&&props.screenHeight<840)}">
        <!--    <div class="top-content">-->

        <div style="flex: 1"></div>
        <img src="@/assets/img/ic_logo.png"/>
        <div style="flex: 1"></div>

        <ElTabs class="home--tabs" v-model="trans.active" @tab-click="onTabChange">
            <ElTabPane label="首页" name='0'></ElTabPane>
            <ElTabPane label="关于我们" name='1'></ElTabPane>
            <ElTabPane label="我们的业务" name='2'></ElTabPane>
            <ElTabPane label="加入我们" name='3'></ElTabPane>
            <ElTabPane label="联系我们" name='4'></ElTabPane>
        </ElTabs>


        <div style="flex: 1"></div>
    </div>
</template>

<script lang="ts" setup>

import { defineProps, onMounted } from 'vue';
import { reactive, watch } from "vue";

const props = defineProps({
    curActive: {
        type: Number,
        default: 1
    },
    screenHeight: {
        type: Number,
        default: 800
    }
})

const trans = reactive({
    active: '1'
})
watch(() => props.curActive, (newVal) => {
    if (newVal == 5) {
        newVal = 4;
    }
    trans.active = newVal + '';
})
const emits = defineEmits(['onTabChange'])

const onTabChange = function (e) {
    emits('onTabChange', Number(e.props.name))
}

</script>

<style scoped lang="less">

.top-content {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 90px;
    background-color: rgba(24, 24, 59, 0.5);
    display: flex;
    align-items: center;
    transition: all 0.5s;
    opacity: 1;

    &.business_active {
        opacity: 0;
        &:hover {
            opacity: 1;
        }
    }


    img {
        width: 240px;
        height: 46px;
    }

}

</style>
