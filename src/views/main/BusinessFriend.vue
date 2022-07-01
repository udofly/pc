<template>
    <div class="friend-content">

        <img class="px--center-parent img-circle" src="@/assets/img/business/ic_trade_circle.png" alt="大圈圈"/>


        <img id="img_phone" class="img-phone" src="@/assets/img/business/ic_friend_phone.png" alt="中间手机"/>
        <img id="img_left" class="img-left" src="@/assets/img/business/ic_friend_sheep.png" alt="左边小羊"/>
        <img id="img_right"  class="img-right" src="@/assets/img/business/ic_friend_girl.png" alt="右边女孩"/>
        <div id="my_bullet" class="div-bullet">
            <img src="@/assets/img/business/ic_friend_bullet_1.png" alt="弹幕1"/>
            <img src="@/assets/img/business/ic_friend_bullet_2.png" alt="弹幕2"/>
            <img src="@/assets/img/business/ic_friend_bullet_3.png" alt="弹幕3"/>
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
    let my_bullet = document.getElementById('my_bullet');
    my_bullet.classList.remove('div-bullet')
    void my_bullet.offsetWidth;
    my_bullet.classList.add('div-bullet')

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
@import "../../assets/style/style";

.friend-content {
    width: 100vw;
    position: relative;
}

.img-circle {
    width: 567px;
    height: 567px;
}

.img-phone {
    position: absolute;
    width: 322px;
    height: 541px;
    top: 77px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: -81px;
    animation: 1.2s phone_translate 1 forwards;
    opacity: 0
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
    top: -923px;
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
    position: absolute;
    width: 280px;
    height: 539px;
    top: 40px;
    right: 50%;
    bottom: 0;
    margin: auto;
    margin-right: 230px;
    animation: 1.2s sheep_translate 1 forwards;
    opacity: 0
}

@keyframes sheep_translate {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(80px, 0);
        -webkit-transform: translate(80px, 0);
    }
}


.img-right {
    position: absolute;
    width: 182px;
    height: 208px;
    top: 358px;
    left: 50%;
    bottom: 0;
    margin: auto;
    margin-left: 150px;
    animation: 1.2s girl_translate 1 forwards;
    opacity: 0
}

@keyframes girl_translate {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(-50px, 0);
        -webkit-transform: translate(-50px, 0);
    }
}


.div-bullet {
    width: 276px;
    height: 282px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 200px;
    margin: auto;
    margin-left: 165px;
    img {
        position: absolute;
        &:nth-child(1) {
            width: 71px;
            height: 42px;
            bottom: -42px;
            left: 0;
            animation: 2.1s bullet_translate_1 1 forwards;
        }
        &:nth-child(2) {
            width: 276px;
            height: 82px;
            bottom: -82px;
            left: 10px;
            animation: 1.4s 0.7s bullet_translate_2 1 forwards;
        }
        &:nth-child(3) {
            width: 210px;
            height: 58px;
            bottom: -58px;
            left: 10px;
            animation: 0.7s 1.4s bullet_translate_3 1 forwards;
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
        transform: translate(0, -95px);
        -webkit-transform: translate(0, -95px);
    }
    100% {
        transform: translate(0, -190px);
        -webkit-transform: translate(0, -190px);
    }
}

@keyframes bullet_translate_3 {
    100% {
        transform: translate(0, -70px);
        -webkit-transform: translate(0, -70px);
    }
}


</style>
