<template>
    <div class="border">
        <h4 class="phase-title">选择订单 </h4>
        <el-empty :image="themeAssets('empty')" :image-size="60" description="暂无订单"/>
    </div>
</template>

<script lang="ts" setup>
import { themeAssets } from "@/utils/utils";
</script>
<style scoped lang="less">

.border {
    height: 100vh;
    border-right: 1px solid var(--pc-color-bg-main);
}

.phase-title {
    background: rgba(0, 30, 255, 0.08);
    color: #151515;
    height: 44px;
    line-height: 44px;
    text-align: center;
    margin-bottom: 0;
}
</style>
