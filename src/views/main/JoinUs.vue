<template>
    <div class="join-content px--flex-column flex-center-v">

        <!--标题等 在招职位 公司文化-->
        <div class="px--flex-row" style="height: 157px">
            <div style="flex: 1"></div>
            <img class="img-top-left" src="@/assets/img/join/ic_join_us_left.png"/>
            <div class="px--flex-column div-tab">
                <div class="px--flex-row" style="flex: 1">
                    <div style="flex: 1"></div>
                    <div class="div-top-tab px--flex-row flex-center">
                        <div :class="{active: trans.tabType === 'job'}" @click="onTabChange('job')"/>
                        <div :class="{active: trans.tabType === 'company'}" @click="onTabChange('company')"/>
                    </div>
                </div>
                <div class="div-line"></div>
            </div>
            <div style="flex: 2"></div>
        </div>

        <div id="div_job" class="join-content-detail">
            <JoinUsJob v-if="trans.tabType === 'job'" :index-main="trans.indexMain"/>
            <JoinUsCompany v-if="trans.tabType === 'company'" :index-main="trans.indexMain"/>
        </div>


    </div>

</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watch } from "vue";
import JoinUsJob from '@/views/main/JoinUsJob.vue';
import JoinUsCompany from '@/views/main/JoinUsCompany.vue';

const props = defineProps({
    indexMain: {
        type: Number,
        default: 0
    }
})
const trans = reactive({
    tabType: 'job',
    indexMain: props.indexMain,
    indexLast: 0
})

const onTabChange = function (tabType) {
    trans.tabType = tabType;
}

watch(() => props.indexMain, (newVal) => {
    trans.indexMain = newVal;

    if (trans.indexMain == 3) {
        nextTick(() => {
            if (trans.indexMain > trans.indexLast) {
                changeClass(1)
            } else {
                changeClass(2)
            }
            trans.indexLast = trans.indexMain;
        })
    } else {
        trans.indexLast = trans.indexMain;
    }
})

onMounted(() => {
    nextTick(() => {
        changeClass(3)
    })
})

const changeClass = function (index: Number) {

    let div_job = document.getElementById('div_job');
    div_job.classList.remove('join-content-detail')
    div_job.classList.remove('join-content-detail-bottom')
    div_job.classList.remove('join-content-detail-top')
    void div_job.offsetWidth;
    if (index == 1) {
        div_job.classList.add('join-content-detail-bottom')
    } else if (index == 2) {
        div_job.classList.add('join-content-detail-top')
    } else {
        div_job.classList.add('join-content-detail')
    }
}


</script>

<style scoped lang="less">

.join-content {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-top: 100px;
    .img-top-left {
        width: 523px;
        height: 136px;
        z-index: 20;
    }

    .div-top-tab {
        z-index: 20;
        height: 134px;
        div {
            width: 192px;
            height: 66px;
            &:nth-child(1) {
                cursor: pointer;
                background-repeat: no-repeat;
                background-size: 192px 66px;
                background-image: url("../../assets/img/join/ic_join_job_n.png");
                &.active {
                    background-image: url("../../assets/img/join/ic_join_job_s.png");
                    background-size: 192px 66px;
                }
                &:hover {
                    background-image: url("../../assets/img/join/ic_join_job_s.png");
                    background-size: 192px 66px;
                }
            }
            &:nth-child(2) {
                cursor: pointer;
                background-repeat: no-repeat;
                background-size: 192px 66px;
                background-image: url("../../assets/img/join/ic_join_company_n.png");
                &.active {
                    background-image: url("../../assets/img/join/ic_join_company_s.png");
                    background-size: 192px 66px;
                }
                &:hover {
                    background-image: url("../../assets/img/join/ic_join_company_s.png");
                    background-size: 192px 66px;
                }
            }
        }
    }

    .div-tab {
        flex: 4;
        padding-bottom: 21px;
        z-index: 20;
    }
    .div-line {
        height: 2px;
        background-color: rgba(216, 216, 216, 0.3);
    }
    .join-content-detail {
        flex: 1;
        z-index: 20;
    }

    .join-content-detail-bottom {
        flex: 1;
        z-index: 20;
        margin-top: 500px;
        animation: 1.2s phone_translate_bottom 1 forwards;
        opacity: 0;
    }
    .join-content-detail-top {
        flex: 1;
        z-index: 20;
        margin-top: -500px;
        animation: 1.2s phone_translate_top 1 forwards;
        opacity: 0;
    }
}


@keyframes phone_translate_bottom {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, -500px);
    }
}

@keyframes phone_translate_top {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
        transform: translate(0, 500px);
    }
}


</style>
