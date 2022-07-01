<template>
    <div class="operation-content">

        <img class="px--center-parent img-circle" src="@/assets/img/business/ic_trade_circle.png" alt="大圈圈"/>
        <img id="img_center" class="img-center" src="@/assets/img/business/ic_operation_center.png" alt="中间手机"/>
        <div id="my_bullet" class="div-bullet">
            <img src="@/assets/img/business/ic_operation_bullet_1.png" alt="弹幕1"/>
            <img src="@/assets/img/business/ic_operation_bullet_2.png" alt="弹幕2"/>
        </div>

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
onMounted(() => {
    nextTick(() => {
        changeClass(3)
    })
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

const changeClass = function (index: Number) {

    let my_bullet = document.getElementById('my_bullet');
    my_bullet.classList.remove('div-bullet')
    void my_bullet.offsetWidth;
    my_bullet.classList.add('div-bullet')


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

.operation-content {
    width: 100vw;
    position: relative;
}

.img-circle {
    width: 567px;
    height: 567px;
}

.img-center {
    position: absolute;
    width: 952px;
    height: 610px;
    top: 0;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -400px;
    animation: 1.2s translate 1 forwards;
    opacity: 0.5
}

@keyframes translate {
    0% {
        opacity: 0.5
    }
    100% {
        opacity: 1;
        transform: translate(-80px, 0);
        -webkit-transform: translate(-80px, 0);
    }
}

.img-center-bottom {
    position: absolute;
    width: 952px;
    height: 610px;
    top: 1077px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -480px;
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
    width: 952px;
    height: 610px;
    top: -923px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -480px;
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


.div-bullet {
    width: 411px;
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 50%;
    bottom: 360px;
    margin: auto;
    //margin-left: 165px;
    img {
        position: absolute;
        width: 411px;
        height: 73px;
        bottom: -73px;
        left: 0;
        &:nth-child(1) {
            width: 411px;
            animation: 1.4s bullet_translate_2 1 forwards;
        }
        &:nth-child(2) {
            animation: 0.7s 0.7s bullet_translate_3 1 forwards;
        }
    }
}

@keyframes bullet_translate_1 {
    33% {
        transform: translate(0, -94px);
        -webkit-transform: translate(0, -94px);
    }
    66% {
        transform: translate(0, -188px);
        -webkit-transform: translate(0, -188px);
    }
    100% {
        transform: translate(0, -282px);
        -webkit-transform: translate(0, -282px);
    }
}

@keyframes bullet_translate_2 {
    50% {
        transform: translate(0, -75px);
        -webkit-transform: translate(0, -75px);
    }
    100% {
        transform: translate(0, -150px);
        -webkit-transform: translate(0, -150px);
    }
}

@keyframes bullet_translate_3 {
    100% {
        transform: translate(0, -75px);
        -webkit-transform: translate(0, -75px);
    }
}


</style>
