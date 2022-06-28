<template>
    <div class="content">
        <div class="content_bg">
            <img class="imgs" :src="playImg"/>
            <div class="spans">视频发送中</div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import  playImg from "@/assets/imgsCom/play_video.png";
export default defineComponent({
    name: 'ImMsgVideoStatus',
    setup(props) {
        return {
            playImg
        }
    },
})

</script>

<style scoped lang="less">
.content{
    display: flex;
    justify-content: center;
    .content_bg{
        width: 120px;
        height: 30px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        .imgs{
            width: 15px;
            height: 15px;
        }
        .spans{
            margin: 5px;
        }
    }
}
</style>