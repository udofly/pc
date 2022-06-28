<template>
    <div class="x--pc-ic">
        <div class="time">{{ time }}</div>
        <div class="container">
            <div class="title">{{ body.title }}</div>
            <div class="desc">{{ body.content }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    from: Object,
    body: Object,
    content: Object,
    time: String
})
</script>

<style scoped lang="less">

.container {
    padding: 10px;
    margin: 0 48px;
    background-color: white;
    border-radius: 8px;
}

.title {
    color: #000;
    font-size: 14px;
}

.desc {
    margin-top: 8px;
    color: #494949;
    font-size: 12px;
}
</style>
