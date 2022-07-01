<template>
    <div class="bottom-content px--flex-row flex-center">

        <img src="@/assets/img/ic_logo_footer.png"/>

        <div class="div-text">
            <div>海南达迪电竞科技有限公司</div>
            <div class="text">增值电信业务经营许可证：鲁B2-20220052</div>
<!--            <div class="text" @click="goGov">琼ICP备19003093号-9</div>-->
            <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">琼ICP备19003093号-9</a>
        </div>
    </div>
</template>

<script lang="ts" setup>

const goGov = function () {
    window.location.href = 'https://beian.miit.gov.cn/#/Integrated/index'
}

</script>
<style scoped lang="less">

.bottom-content {
    width: 100vw;
    height: 216px;
    z-index: 20;
    background-color: #000029;
    img {
        width: 152px;
        height: 146px;
        object-fit: cover;
        z-index: 20;
        margin-right: 400px;
    }
    .div-text {
        text-align: end;
        font-size: 18px;
        color: #FFF;
        div {
            &:nth-child(2) {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
        a{
            color: #FFF;
            font-size: 18px;
        }
    }
}

</style>
