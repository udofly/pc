<template>
    <div class="home-content">
        <img class="image-slogan" src="../../assets/img/home/ic_home_slogan.png">


        <div style="width: 100vw;height: 100vh;overflow: hidden">
            <video id="video_ing" class="video-start" playsinline="true" muted width="100vw" height="100vh" loop="true">
                <source src="../../assets/video/video_home_2.mp4" type="video/mp4">
                抱歉,您的浏览器不支持该视频播放。
            </video>
            <video id="video_start" v-if="trans.isFirst" autoplay class="video-start" playsinline="true" muted width="100vw" height="100vh"
            >
                <source src="../../assets/video/video_home_1.mp4" type="video/mp4">
                抱歉,您的浏览器不支持该视频播放。
            </video>
        </div>

        <div class="div-mouse px--flex-column flex-center" @click="goSecondPage">
            <img class="img-mouse" src="@/assets/img/home/ic_right_mouse.png"/>

            <div class="div-rain">
                <img class="img-rain" src="@/assets/img/home/ic_home_arrow.png"/>
            </div>
        </div>


    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watch } from "vue";

const trans = reactive({
    isFirst: true
})


const doMounted = function () {
    console.log()
//监听播放时间
    let myVideo = document.getElementById('video_start');
    let myVideoIng = document.getElementById('video_ing');
    //监听播放结束
    myVideo.addEventListener('ended', function () {
        trans.isFirst = false;
        myVideoIng.play();
    });

}

onMounted(doMounted);
let emits = defineEmits(['onGoSecondPage']);
const goSecondPage = function () {
    emits('onGoSecondPage');
}

</script>

<style scoped lang="less">

.home-content {
    width: 100vw;
    height: 100vh;
    //background-image: url('../../assets/img/home/ic_bg_home.png') !important;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 50;

    .video-start {
        width: 100vw !important;
        height: 100vh !important;
        object-fit: cover;
        z-index: 21;
        position: absolute;
        top: 0;
        left: 0;
    }
    .video-ing {
        width: calc(2427 / 1938 * 100vh);
        height: 100vh;
        z-index: 21;
        object-fit: cover;
    }
    .img-start {
        //width: 100vw;
        width: calc(2427 / 1938 * 100vh);
        height: 100vh;
        z-index: 21;
    }
    .img-ing {
        width: calc(2427 / 1938 * 100vh);
        height: 100vh;
        z-index: 21;
    }
    .image-slogan {
        width: 1269px;
        height: 240px;
        z-index: 22;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
    }

    .div-mouse {
        z-index: 21;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        width: 26px;
        bottom: 82px;
        cursor: pointer;
        .img-mouse {
            width: 26px;
            height: 46px;
        }

        .div-rain {
            width: 8px;
            height: 40px;
            margin-top: 8px;
            overflow: hidden;
            .img-rain {
                width: 8px;
                height: 16px;
                margin-top: 8px;
                animation: 1s spin infinite forwards linear;
            }
        }
    }


    @keyframes spin {
        0% {
            transform: translateY(-32px);
        }
        100% {
            transform: translateY(32px);
        }
    }
}


</style>
