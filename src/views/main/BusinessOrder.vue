<template>
    <div class="order-content">
        <img class="px--center-parent img-circle" src="@/assets/img/business/ic_trade_circle.png" alt="大圈圈"/>
        <img id="img_center" class="img-center" src="@/assets/img/business/ic_friend_center.png" alt="中间"/>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, watch } from "vue";
const props = defineProps({
    indexMain: {
        type: Number,
        default: 0
    }
})

const trans = reactive({
    indexMain: props.indexMain,
    indexLast: 0
})

watch(() => props.indexMain, (newVal) => {
    trans.indexMain = newVal;

    if (trans.indexMain == 2) {
        nextTick(() => {
            if (trans.indexMain > trans.indexLast) {
                changeClass(1)
            } else {
                changeClass(2)
            }
            trans.indexLast = trans.indexMain;
        })
    } else {
        trans.indexLast = trans.indexMain;
    }
})

const changeClass = function (index:Number) {

    let img_center = document.getElementById('img_center');
    img_center.classList.remove('img-center')
    img_center.classList.remove('img-center-bottom')
    img_center.classList.remove('img-center-top')
    void img_center.offsetWidth;
    if (index == 1) {
        img_center.classList.add('img-center-bottom')
    } else if (index == 2) {
        img_center.classList.add('img-center-top')
    } else {
        img_center.classList.add('img-center')
    }
}
</script>

<style scoped lang="less">
@import "../../assets/style/style";

.order-content {
    width: 100vw;
    position: relative;

    .img-circle {
        width: 567px;
        height: 567px;
    }
    .img-center {
        position: absolute;
        width: 864px;
        height: 596px;
        top: 0;
        left: 50%;
        bottom: 0;
        margin: auto;
        margin-left: -352px;
        animation: 1.2s translate 1 forwards;
        opacity: 0.5
    }
}


@keyframes translate {
    0% {
        opacity: 0.5
    }
    100% {
        opacity: 1;
        transform: translate(-80px, 0);
    }
}


.img-center-bottom {
    position: absolute;
    width: 864px;
    height: 596px;
    top: 1077px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -432px;
    animation: 1.2s translate_bottom 1 forwards;
    opacity: 0.5
}


@keyframes translate_bottom {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, -500px);
    }
}



.img-center-top {
    position: absolute;
    width: 864px;
    height: 596px;
    top: -923px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -432px;
    animation: 1.2s translate_top 1 forwards;
    opacity: 0.5
}


@keyframes translate_top {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, 500px);
    }
}


</style>
