<template>
    <div class="main-content" @touchmove.prevent @mousewheel.prevent>

        <MainTop
            style="z-index: 21"
            v-if="trans.screenIndex!=0"
            :cur-active="trans.screenIndex"
            :screen-height="trans.screenHeight"
            @onTabChange="clickTopTab"/>

        <div class="center-body">
            <Home @onGoSecondPage="goSecondPage()"/>
            <About/>
            <Business :index-main="trans.screenIndex"/>
            <JoinUs :index-main="trans.screenIndex"/>
            <ContactUs/>
            <Footer/>
        </div>

        <HomeLeft
            v-if="trans.screenIndex!=0"
            style="z-index: 10"
            :index-main="trans.screenIndex"/>
        <HomeRight
            v-if="trans.screenIndex!=0"
            :index-main="trans.screenIndex"/>
        <HomeRightMouse
            v-if="trans.screenIndex!=0"
            :index-main="trans.screenIndex"
            @onGoNextPage="goNextPage"/>

    </div>
</template>

<script lang="ts" setup>
import HomeLeft from '@/views/main/HomeLeft.vue';
import About from '@/views/main/About.vue';
import HomeRight from '@/views/main/HomeRight.vue';
import Business from '@/views/main/Business.vue';
import ContactUs from '@/views/main/ContactUs.vue';
import JoinUs from '@/views/main/JoinUs.vue';
import Home from '@/views/main/Home.vue';
import MainTop from '@/views/main/MainTop.vue';
import Footer from '@/views/main/Footer.vue';
import { onMounted, reactive, watch } from 'vue';
import { debounce } from 'lodash-es';
import HomeRightMouse from '@/views/main/HomeRightMouse.vue';


const trans = reactive({
    screenHeight: 686,
    screenIndex: 0,
    screenLastY: 0,
    timeDebounce: 1000,
    isScroll: false,
    showBusiness: false,
    showJoin: false,
    numIntoBusiness: 0
})

onMounted(() => {

    //监听鼠标滚动事件
    window.addEventListener('mousewheel', onMouseScroll);
    trans.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('resize', onScreenResize)

    document.onkeydown = (e) => {
        event.preventDefault();
        window.event.preventDefault();
    }
    scrollToDetail(0);
})

const clickTopTab = function (index: number) {
    if (trans.screenIndex != index) {
        scrollToDetail(index);
    }
}

const goSecondPage = function () {
    scrollToDetail(1);
}

const goNextPage = function () {
    scrollToDetail(trans.screenIndex + 1);
}

/**
 * 监听屏幕缩放
 * @param e
 */
const onScreenResize = function (e) {
    let heightTemp = document.documentElement.clientHeight || document.body.clientHeight;
    if (heightTemp > 686) {
        trans.screenHeight = heightTemp;
    } else {
        trans.screenHeight = 686;
    }
}

const onMouseScroll = function (e) {
    scrollAnimation(e.deltaY > 0);
    if ((e.deltaY > 0 && trans.screenIndex == 4) || (e.deltaY < 0 && trans.screenIndex == 5)) {
        trans.timeDebounce = 200;
    } else {
        trans.timeDebounce = 1000;
    }
}

const scrollAnimation = debounce(function (isDown) {
        if (isDown) {
            if (trans.screenIndex < 5) {
                scrollToDetail(trans.screenIndex + 1);
            }
        } else {
            if (trans.screenIndex > 0) {
                scrollToDetail(trans.screenIndex - 1);
            }
        }
    },
    trans.timeDebounce,
    {
        'maxWait': trans.timeDebounce,
        leading: true,
        trailing: false
    }
);

const scrollToDetail = function (targetIndex: number) {
    if (targetIndex == 2) {

    } else if (targetIndex == 3) {
        trans.showJoin = true;
    }

    let targetY

    if (targetIndex <= 4) {
        targetY = targetIndex * trans.screenHeight;
    } else {
        targetY = 4 * trans.screenHeight + 216;
    }
    trans.screenLastY = targetY;
    trans.screenIndex = targetIndex;
    window.scroll({
        top: targetY,
        left: 0,
        behavior: 'smooth' //滚动条平滑滚动
    });
}

watch(() => trans.screenIndex, (newVal) => {
    // console.log('当前页码 = ' + newVal)
})

</script>

<style lang="less">

::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}


</style>

<style scoped lang="less">

.main-content {
    width: 100vw;
    overflow: hidden;
    background-image: url('@/assets/img/home/ic_bg_normal.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    .center-body {
        z-index: 20;
    }
}

.my-swipe .van-swipe-item {
    color: #FFF;
    font-size: 20px;
    height: 400vh;
    text-align: center;
    background-color: #39A9ED;
}


</style>
