<template>
    <div class="logo">
        <!--<img-->
        <!--    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-02%2F5a223fea35894.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659000776&t=dc88b5a53f81fc7d5c43414d820961bb"-->
        <!--    :alt="appTitle"-->
        <!--    @click="onGoHome">-->

        <video id="video_welcome"
            @click="onGoHome"
            class="video-start"
            autoplay
            :playsinline="true"
            muted
            width="100vw"
            height="100vh"
            :loop="false">
            <source src="../../assets/video/video_welcome.mp4" type="video/mp4">
            抱歉,您的浏览器不支持该视频播放。
        </video>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { appTitle } from '@/utils/conf';
import { onMounted } from "vue";

const router = useRouter();


onMounted(()=>{
    //监听播放时间
    let myVideo = document.getElementById('video_welcome');
    //监听播放结束
    myVideo.addEventListener('ended', function () {
        window.open('https://blog-udofly.vercel.app/', 'blog')
    });
})
const onGoHome = function () {
    router.push({name:'pc.main'})
    //
}
</script>

<style scoped lang="less">


.logo {
    img {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }
    video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }

}
</style>
