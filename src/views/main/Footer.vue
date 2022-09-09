<template>
    <div class="bottom-content px--flex-row flex-center">

        <img src="@/assets/img/ic_logo_footer.png"/>

        <div class="div-text">
            <div>~~~~~~~~~</div>
            <div class="text">~~~~~~~~~</div>
            <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">~~~~~~~~~</a>
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
