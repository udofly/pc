<template>
    <div class="left-content">
        <img src="@/assets/img/home/ic_home_left.png" :class="{move:(props.indexMain==5)}"/>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    indexMain: {
        type: Number,
        default: 1
    }
})

</script>

<style scoped lang="less">

.left-content {
    position: fixed;
    left: 0;
    top: 0;
    width: 354px;
    height: 100vh;
    display: flex;
    align-items: center;

    img {
        width: 100%;
        height: 540px;
        object-fit: cover;
        transition: all 0.25s linear;
        &.move {
            margin-top: -432px;
        }
    }
    z-index: 10;
}

</style>
