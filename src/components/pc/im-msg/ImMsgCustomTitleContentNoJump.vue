<template>
    <div class="x--pc-ic">
        <div class="time">{{ time }}</div>
        <div class="container">
            <div class="title">{{ body.title }}</div>
            <div class="desc">{{ body.content }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    from: Object,
    body: Object,
    content: Object,
    time: String
})
</script>

<style scoped lang="less">

.container {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
}

.title {
    color: var(--pc-color-text-black);
    font-size: 14px;
    font-weight: bold;
}

.desc {
    margin-top: 8px;
    color: var(--pc-color-text-black);
    font-size: 12px;
}

</style>
