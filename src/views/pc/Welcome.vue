<template>
    <div class="logo">
        <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-06-01%2F5b10ee5e9225f.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658996824&t=fb7bcd0e787b4ddf237fb7b1f7f867fc"
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
