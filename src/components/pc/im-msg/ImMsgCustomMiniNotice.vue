<template>
    <div class="content">
        <p class="content-text">{{ body.title }}</p>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    from: Object,
    body: Object,
    content: Object,
    time: String
})
</script>

<style scoped lang="less">

.content {
    padding: 0 30px 15px 30px;
}

.content-text {
    color: var(--pc-color-text-light);
    font-size: 6px;
    text-align: center;
}
</style>
