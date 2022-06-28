<template>
    <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { appName } from '@/utils/conf';

onMounted(() => {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    }
    document.documentElement.setAttribute('theme', appName);
})
</script>

<style lang="less">
body {
    background: var(--k-color-bg-main);
}

#app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
