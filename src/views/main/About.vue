<template>
    <div class="about-content" >

        <div class="center-content">
            <div class="div-item">
                <img class="img-top" src="@/assets/img/about/ic_about_left_1.png"/>
                <div class="div-center"></div>
                <img class="img-bottom" src="@/assets/img/about/ic_about_left_2.png"/>
            </div>

            <div class="div-item div-item-center">
                <img class="img-top" src="@/assets/img/about/ic_about_center_1.png"/>
                <div class="div-center"></div>
                <img class="img-bottom" src="@/assets/img/about/ic_about_center_2.png"/>
            </div>

            <div class="div-item">
                <img class="img-top" src="@/assets/img/about/ic_about_right_1.png"/>
                <div class="div-center"></div>
                <img class="img-bottom" src="@/assets/img/about/ic_about_right_2.png"/>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">

.about-content {
    width: 100vw;
    height: 100vh;
    display: flex;
    z-index: 20;
    justify-content: center;
    align-items: center;
}

.center-content {
    display: flex;
    height: 100vh;
    z-index: 20;
    justify-content: center;
}
.div-item {
    width: 375px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: none;
    .img-top {
        width: 290px;
        transition: all 0.3s;
    }
    .img-bottom {
        margin-top: 50px;
        width: 290px;
        transition: all 0.3s;
    }

    &:hover {
        background-image: url('@/assets/img/about/ic_about_bg_hover.png');
        background-size: cover;
        .img-top {
            width: 350px;
            margin-top: -40px;
        }
        .img-bottom {
            width: 315px;
            //margin-top: 50px;
        }
    }

}

.div-item-center {
    margin: 0 40px;
}


//@keyframes translate_top {
//    100% {
//        transform: scale(1.29,1.29) translate(0, -20px) ;
//        -webkit-transform:scale(1.29,1.29) translate(0, -20px) ;
//    }
//}
//
//@keyframes translate_bottom {
//    100% {
//        transform: scale(1.1,1.1) translate(0, -10px) ;
//        -webkit-transform:scale(1.1,1.1) translate(0, -10px) ;
//    }
//}

</style>
