<template>
    <div class="trade-content">

        <div class="px--center-parent trade-center-content">
            <div id="myCircle" class="px--center-parent circle">
                <img class="img-circle" src="@/assets/img/business/ic_trade_circle.png" alt="大圈圈"/>
                <div class="games">
                    <img src="@/assets/img/business/ic_trade_game_1.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_2.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_3.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_4.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_5.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_6.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_7.png" alt="logo"/>
                    <img src="@/assets/img/business/ic_trade_game_8.png" alt="logo"/>
                </div>
            </div>
            <img id="img_phone" class="img-phone" src="@/assets/img/business/ic_trade_phone.png" alt="中间手机"/>

        </div>
        <img id="img_left" class="img-left" src="@/assets/img/business/ic_trade_left.png" alt="左图"/>
        <img id="img_right" class="img-right" src="@/assets/img/business/ic_trade_right.png" alt="右图"/>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watch } from "vue";
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

onMounted(() => {
    nextTick(() => {
        changeClass(3)
    })
})

const changeClass = function (index: Number) {
    // console.log('index = ' + index)
    let myCircle = document.getElementById('myCircle');
    myCircle.classList.remove('circle')
    void myCircle.offsetWidth;
    myCircle.classList.add('circle')

    let img_left = document.getElementById('img_left');
    img_left.classList.remove('img-left')
    void img_left.offsetWidth;
    img_left.classList.add('img-left')

    let img_right = document.getElementById('img_right');
    img_right.classList.remove('img-right')
    void img_right.offsetWidth;
    img_right.classList.add('img-right')

    let img_phone = document.getElementById('img_phone');
    img_phone.classList.remove('img-phone')
    img_phone.classList.remove('img-phone-bottom')
    img_phone.classList.remove('img-phone-top')
    void img_phone.offsetWidth;
    if (index == 1) {
        img_phone.classList.add('img-phone-bottom')
    } else if (index == 2) {
        img_phone.classList.add('img-phone-top')
    } else {
        img_phone.classList.add('img-phone')
    }
}

</script>

<style scoped lang="less">

.trade-content {
    width: 100vw;
    position: relative;
}

.trade-center-content {
    width: 567px;
}

.circle {
    width: 567px;
    height: 567px;

    .img-circle {
        width: 40%;
        height: 40%;
        margin-left: 170px;
        margin-top: 170px;
        animation: 1.2s circle-scale 1 forwards;
    }
    .games {
        position: absolute;
        left: 250px;
        top: 250px;
        img {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.2;

            &:nth-child(1) {
                width: 50px;
                height: 50px;
                animation: 1.2s game_translate_1 1 forwards;
            }
            &:nth-child(2) {
                width: 37px;
                height: 35px;
                animation: 1.2s game_translate_2 1 forwards;
            }
            &:nth-child(3) {
                width: 50px;
                height: 50px;
                animation: 1.2s game_translate_3 1 forwards;
            }
            &:nth-child(4) {
                width: 44px;
                height: 44px;
                animation: 1.2s game_translate_4 1 forwards;
            }
            &:nth-child(5) {
                width: 55px;
                height: 55px;
                animation: 1.2s game_translate_5 1 forwards;
            }
            &:nth-child(6) {
                width: 55px;
                height: 55px;
                animation: 1.2s game_translate_6 1 forwards;
            }
            &:nth-child(7) {
                width: 55px;
                height: 55px;
                animation: 1.2s game_translate_7 1 forwards;
            }
            &:nth-child(8) {
                width: 55px;
                height: 55px;
                animation: 1.2s game_translate_8 1 forwards;
            }
        }
    }
}

.img-phone {
    width: 322px;
    height: 541px;
    position: absolute;
    top: 77px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -81px;
    animation: 1.2s phone_translate 1 forwards;
    opacity: 0;
    z-index: 23;
}

@keyframes phone_translate {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(-80px, 0);
    }
}


.img-phone-bottom {
    width: 322px;
    height: 541px;
    position: absolute;
    top: 1077px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -161px;
    animation: 1.2s phone_translate_bottom 1 forwards;
    opacity: 0;
    z-index: 23;
}

@keyframes phone_translate_bottom {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, -500px);
    }
}

.img-phone-top {
    width: 322px;
    height: 541px;
    position: absolute;
    top:-923px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -161px;
    animation: 1.2s phone_translate_top 1 forwards;
    opacity: 0;
    z-index: 23;
}

@keyframes phone_translate_top {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, 500px);
    }
}


.img-left {
    width: 307px;
    height: 137px;
    position: absolute;
    right: 50%;
    bottom: 50%;
    margin-right: 140px;
    margin-bottom: 140px;
    opacity: 2;
    animation: 1.2s left_translate 1 forwards;
}

.img-right {
    width: 281px;
    height: 179px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: 160px;
    margin-top: 30px;
    opacity: 0;
    animation: 1.2s right_translate 1 forwards;
}

@keyframes circle-scale {
    100% {
        transform: scale(2.5, 2.5);
        -webkit-transform: scale(2.5, 2.5);
    }
}

@keyframes game_translate_1 {
    100% {
        opacity: 1;
        transform: translate(160px, -160px);
    }
}

@keyframes game_translate_2 {
    100% {
        opacity: 1;
        transform: translate(260px, -130px);
    }
}

@keyframes game_translate_3 {
    100% {
        opacity: 1;
        transform: translate(220px, 0px);
    }
}

@keyframes game_translate_4 {
    100% {
        opacity: 1;
        transform: translate(100px, 280px);
    }
}

@keyframes game_translate_5 {
    100% {
        transform: translate(-230px, 160px);
        opacity: 1;
    }
}

@keyframes game_translate_6 {
    100% {
        transform: translate(-270px, 40px);
        opacity: 1;
    }
}

@keyframes game_translate_7 {
    100% {
        transform: translate(-210px, 20px);
        opacity: 1;
    }
}

@keyframes game_translate_8 {
    100% {
        transform: translate(-120px, -250px);
        opacity: 1;
    }
}

@keyframes left_translate {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(-30px, 0);
    }
}

@keyframes right_translate {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(30px, 0);
    }
}


.div-item-center {
    margin: 0 80px;
}

</style>
