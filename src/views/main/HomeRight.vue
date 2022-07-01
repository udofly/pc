<template>
    <div class="right-content"  >

        <div class="div-img-top">
            <div class="div-img-left" :class="{move_left:(props.indexMain==5)}">
                <img v-if="props.indexMain===1" style="height: 270px" class="img-left" src="@/assets/img/home/ic_right_about.png"/>
                <img v-if="props.indexMain===2" style="height: 390px" class="img-left" src="@/assets/img/home/ic_right_business.png"/>
                <img v-if="props.indexMain===3" style="height: 207px" class="img-left" src="@/assets/img/home/ic_right_join.png"/>
                <img v-if="props.indexMain===4||props.indexMain===5" style="height: 341px" class="img-left"
                    src="@/assets/img/home/ic_right_contact.png"/>
            </div>
            <img class="img-right"  :class="{move_right:(props.indexMain==5)}" src="@/assets/img/home/ic_right_point.png"/>
        </div>
        <div style="flex: 1"/>

    </div>
</template>

<script lang="ts" setup>


import { defineProps } from 'vue';

const props = defineProps({
    indexMain: {//外层的index
        type: Number,
        default: 0
    }
})


</script>

<style scoped lang="less">

.right-content {
    position: fixed;
    right: 0;
    top: 0;
    width: 354px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: end;

    .div-img-top {
        display: flex;
        z-index: 10;
    }
    .div-img-left {
        width: 39px;
        margin-top: 130px; //216-130 = 86
        transition: all 0.25s linear;
        .img-left {
            width: 39px;
            object-fit: cover;
            animation: 0.8s translate 1 forwards;
            opacity: 1
        }
    }
    @keyframes translate {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1;
        }
    }

    .img-right {
        width: 2px;
        height: 292px;
        margin: 130px 30px 0 28px;
        object-fit: cover;
        transition: all 0.25s linear;
    }

    .move_left {
        margin-top: -86px; //216-130 = 86
    }
    .move_right {
        margin: -86px 30px 0 28px;
    }

}

</style>
