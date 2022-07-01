<template>
    <div class="div-img-bottom" v-if="props.indexMain!=0" :class="{mouse_hide:(props.indexMain===5||props.indexMain===4)}">
        <img class="img-mouse" @click="goNextPage" src="@/assets/img/home/ic_right_mouse.png"/>
        <div class="div-rain">
            <div class="rain"></div>
        </div>
        <div class="rain-bottom"></div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    indexMain: {
        type: Number,
        default: 1
    }
})
let emits = defineEmits(['onGoNextPage']);
const goNextPage = function () {
    emits('onGoNextPage');
}


</script>

<style scoped lang="less">


.div-img-bottom {
    position: fixed;
    right: 72px;
    bottom: 127px;
    width: 16px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 25;
    .img-mouse {
        width: 16px;
        height: 29px;
        cursor: pointer;
    }
    .div-rain {
        width: 1px;
        height: 23px;
        margin-top: 8px;
        overflow: hidden;
        .rain {
            width: 1px;
            height: 23px;
            background-color: #FFF;
            margin-top: 8px;
            animation: 1s spin infinite forwards linear;

        }
    }
    .rain-bottom {
        width: 1px;
        margin-top: 8px;
        height: 61px;
        background-color: #FFF;
    }
    opacity: 1;
    transition: all 0.5s;

    &.mouse_hide {
        opacity: 0;
    }
}

@keyframes spin {
    0% {
        transform: translateY(-25px);
    }
    100% {
        transform: translateY(25px);
    }


}

</style>
