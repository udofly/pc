<template>
    <div class="logo">
        <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-02%2F5a223fea35894.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659000776&t=dc88b5a53f81fc7d5c43414d820961bb"
            :alt="appTitle">
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { appTitle } from '@/utils/conf';

const router = useRouter();

</script>

<style scoped lang="less">


.logo {
    img {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }

}
</style>
