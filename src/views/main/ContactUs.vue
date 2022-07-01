<template>
    <div class="contact-content px--flex-column">

        <div class="px--flex-row div-title">
            <div style="flex: 1"/>
            <img class="img-top-contact" src="@/assets/img/contact/ic_contact_left.png"/>
            <div style="flex: 6"/>
        </div>
        <div style="flex: 1"/>
        <div class="px--flex-row flex-center div-body">
            <div style="flex: 2"/>
            <div class="div-item">
                <div class="div-top">
                    <img class="px--center-parent img-heart" src="@/assets/img/contact/ic_contact_center_1.png"/>
                    <img class="px--center-parent img-circle" src="@/assets/img/contact/ic_contact_circle_bg.png"/>
                </div>

                <span class="text-top">商务合作</span>
                <span class="text-bottom">kejinshou@qq.com</span>
            </div>
            <div style="flex: 1"/>
            <div class="div-item">
                <div class="div-top">
                    <img class="px--center-parent img-heart" src="@/assets/img/contact/ic_contact_center_2.png"/>
                    <img class="px--center-parent img-circle" src="@/assets/img/contact/ic_contact_circle_bg.png"/>
                </div>

                <span class="text-top">招聘相关</span>
                <span class="text-bottom">nglszs568@dingtalk.com</span>
            </div>
            <div style="flex: 1"/>
            <div class="div-item" id="id-img-circle">
                <div class="div-top">
                    <img class="px--center-parent img-heart" src="@/assets/img/contact/ic_contact_center_3.png"/>
                    <img class="px--center-parent img-circle"
                        src="@/assets/img/contact/ic_contact_circle_bg.png"/>
                </div>

                <span class="text-top">廉洁举报</span>
                <span class="text-bottom">mengqingcai1998@dingtalk.com</span>
            </div>
            <div style="flex: 2"/>
        </div>
        <div style="flex: 2"/>
    </div>

</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">

.contact-content {
    width: 100vw;
    height: 100vh;
    padding-top: 100px;

    .div-title {
        height: 157px;
        width: 100vw;

        .img-top-contact {
            width: 501px;
            height: 157px;
            z-index: 20;
        }
    }

    .div-body {
        z-index: 20;

        .div-item {
            width: 221px;
            height: 350px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .div-top {
                width: 221px;
                height: 221px;
                position: relative;
                //background-color: #FF4646;

                .img-heart {
                    width: 159px;
                    height: 159px;
                    margin: 31px;
                    transition: all 1s;
                }
                .img-circle {
                    width: 191px;
                    height: 193px;
                    margin: 14px 15px;
                    transition: all 1s;
                }
                &:hover {
                    .img-heart {
                        width: 183px;
                        height: 183px;
                        margin: 19px;
                    }
                    .img-circle {
                        width: 219px;
                        height: 221px;
                        margin: 0 1px;
                        transform:rotate(180deg);
                        //animation: 2s 0.5s circle_rotation infinite forwards linear;
                    }


                    //transform: scale(1.15, 1.15);
                    //transition: all 0.5s;

                }
            }

            .text-top {
                color: #FFF;
                font-size: 18px;
                margin-top: 66px;
            }

            .text-bottom {
                color: #FFF;
                font-size: 16px;
                margin-top: 16px;
            }

            //&:nth-child(2) {
            //    margin: 0 232px;
            //}
        }
    }

}


@keyframes circle_rotation {
    //0% {
    //    transform: rotate(0deg);
    //    -webkit-transform: rotate(0deg);
    //}
    //50% {
    //    transform: rotate(180deg);
    //    -webkit-transform: rotate(180deg);
    //}
    100% {
        transform: rotate(360deg);
    }
}


</style>
