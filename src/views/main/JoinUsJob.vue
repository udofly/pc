<template>
    <div class="job-content px--flex-column flex-center ">
        <div id="div_top_tab" class="div-top-tab px--flex-row flex-center">
            <div :class="{active: trans.jobType === 'game'}" @click="onTabChange('game')"/>
            <div :class="{active: trans.jobType === 'operation'}" @click="onTabChange('operation')"/>
        </div>
        <div id="job_detail" class="job-detail px--flex-column ">
            <div class="div-job" v-if="trans.jobType === 'game'">
                <p>全职|山东.济南市</p>
                <p>岗位职责</p>
                <div>1、参与抖音快手等直播短视频平台的直播， 完成直播前的直播间布置、试镜;</div>
                <div>2、需要COSPLAY;</div>
                <div>3、跟踪平台数据整理分析，实时关注直播行业动向，提出相应的合理化建议;</div>
                <div>4、直播活动的策划、组织、准备工作及气氛调节;</div>
                <div>5、配合并完成上级安排的其他临时工作;</div>
                <p>任职要求:</p>
                <div>1、有几项精通的游戏，了解热点动态，热爱游戏服务行业</div>
                <div>2、思维活跃，口齿伶俐，较强的应变能力与沟通能力，言语具有亲和力;</div>
                <div>3、学习能力强， 快速准确掌握产品相关知识，并能在直播中生动形象的展现相关产品;</div>
                <div>4、镜头造型感强，有较强的语言表达能力和临场应变能力，性格活泼开朗，喜欢展现自己;</div>
                <div>5、学历大专以上;</div>
                <div>6、[颜值主播]</div>

            </div>

            <div class="div-job" v-if="trans.jobType === 'operation'">
                <p>全职|山东.济南市</p>
                <p>岗位职责</p>
                <div>1、负责公司抖音、快手等短视频平台账号的日常运营，高效产出目标粉丝群体喜欢的热点视频内容，提高粉丝关注度;</div>
                <div>2、负责协调编导和剪辑的日常工作对接，保证工作计划的顺利执行;</div>
                <div>3、负责和平台内的粉丝互动，提高用户粘性，增加我们账号的曝光度;</div>
                <div>4、负责短视频的运营事项，对平台数据实时监控;</div>
                <p>任职要求:</p>
                <div>1、学历不限，有丰富的短视频运营经验</div>
                <div>2、具备从0到1起号的能力,需要有数据良好的案例;</div>
                <div>3、有较活跃的思维，敢于创新、视角独特、审美独到;</div>
                <div>4、长期混迹于微博、小红书、知乎和各大短视频平台，如抖音、快手、火山、西瓜等;</div>
                <div>5、有较好的文字功底，擅长策划、编写;</div>
                <div>6、我们的团队都是网上冲浪5G流量的年轻人，期待您与我们同行;</div>
            </div>


            <!--            <img id="img_job1" class="img-job1" src="../../assets/img/join/ic_job_game.png" v-if="trans.jobType === 'game'"/>-->
            <!--            <img id="img_job2" class="img-job2" src="../../assets/img/join/ic_job_operation.png" v-if="trans.jobType === 'operation'"/>-->
        </div>
    </div>

</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watch } from "vue";


const props = defineProps({
    indexMain: {
        type: Number,
        default: 0
    }
})

const trans = reactive({
    jobType: 'game',
    indexMain: props.indexMain
})

watch(() => props.indexMain, (newVal) => {
    trans.indexMain = newVal;
    if (trans.indexMain == 3) {
        nextTick(() => {
            // changeClass(true)
            // console.log('watch')
        })
    }
})

onMounted(() => {
    nextTick(() => {
        // changeClass(false)

    })
})

const onTabChange = function (jobType) {
    trans.jobType = jobType;
}


</script>

<style scoped lang="less">

.job-content {
    width: 100vw;
    //background-color: #FFA12E;

    .div-top-tab {
        div {
            margin-top: 10px;
            height: 30px;
            width: 127px;
            &:nth-child(1) {
                cursor: pointer;
                background-repeat: no-repeat;
                background-size: 127px 29px;
                margin-right: 34px;
                background-image: url("../../assets/img/join/ic_job_tab-game_n.png");
                &.active {
                    background-image: url("../../assets/img/join/ic_job_tab-game_s.png");
                }
            }
            &:nth-child(2) {
                cursor: pointer;
                background-repeat: no-repeat;
                background-size: 127px 29px;
                background-image: url("../../assets/img/join/ic_job_tab_operation_n.png");
                &.active {
                    background-image: url("../../assets/img/join/ic_job_tab_operation_s.png");
                }
            }

        }

    }

    .job-detail {
        width: 900px;
        color: #FFF;
        font-size: 16px;
        .div-job {
            width: 700px;
            height: 453px;
            margin-left: 150px;
            margin-top: 20px;
            animation: 0.5s translate_1 1 forwards;
            opacity: 0.5
        }

        @keyframes translate_1 {
            0% {
                opacity: 0.5
            }
            100% {
                opacity: 1;
                transform: translate(-50px, 0);
            }
        }
        //@keyframes translate_2 {
        //    0% {
        //        opacity: 0.5
        //    }
        //    100% {
        //        opacity: 1;
        //        transform: translate(-46px, 0);
        //    }
        //}

        //.img-job1 {
        //    margin-top: 30px;
        //    width: 719px;
        //    height: 453px;
        //    //margin-left: 200px;
        //    animation: 0.5s translate_1 1 forwards;
        //    opacity: 0.5
        //}
        //
        //.img-job2 {
        //    margin-top: 30px;
        //    width: 727px;
        //    height: 454px;
        //    //margin-left: 200px;
        //    animation: 0.5s translate_2 1 forwards;
        //    opacity: 0.5
        //}
    }

}

</style>


<!--// const listJob = ref(-->
<!--//     [{-->
<!--//         type: 'game',-->
<!--//         title: '游戏主播',-->
<!--//         jobCity: '济南1',-->
<!--//         jobRequire: '岗位职责1',-->
<!--//         yourRequire: '任职要求1'-->
<!--//     },-->
<!--//         {-->
<!--//             type: 'operation',-->
<!--//             title: '品类运营',-->
<!--//             jobCity: '济南2',-->
<!--//             jobRequire: '岗位职责2',-->
<!--//             yourRequire: '任职要求2'-->
<!--//         }])-->


<!--        <div class="div-top-tab px&#45;&#45;flex-row flex-center">-->
<!--            <div v-for="item in listJob" :key="item" :class="{active: trans.jobType === item.type}" @click="onTabChange(item.type)">-->
<!--                {{ item.title }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="px&#45;&#45;flex-column flex-center">-->
<!--            <div v-for="item in listJob" :key="item">-->
<!--                <div class="job-require px&#45;&#45;flex-column" v-if="trans.jobType === item.type">-->
<!--                    <p>{{ item.jobCity }}</p>-->
<!--                    <p>{{ item.jobRequire }}</p>-->
<!--                    <p>{{ item.yourRequire }}</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->


<!--.job-require {-->
<!--width: 727px;-->
<!--height: 454px;-->
<!--word-break: break-all;-->
<!--font-size: 14px;-->
<!--p {-->
<!--color: #FFF;-->
<!--&:nth-child(1) {-->
<!--color: #8A8A9A;-->
<!--margin-top: 20px;-->
<!--}-->
<!--&:nth-child(2) {-->
<!--margin-top: 20px;-->
<!--}-->
<!--&:nth-child(3) {-->
<!--margin-top: 20px;-->
<!--}-->
<!--}-->
<!--}-->


<!--const changeClass = function (isDownUp) {-->

<!--// console.log('更换样式')-->
<!--// let div_top_tab = document.getElementById('div_top_tab');-->
<!--// div_top_tab.classList.remove('div-top-tab')-->
<!--// div_top_tab.classList.remove('div-top-tab-bottom')-->
<!--// void div_top_tab.offsetWidth;-->
<!--// if (isDownUp) {-->
<!--//     div_top_tab.classList.add('div-top-tab-bottom')-->
<!--// } else {-->
<!--//     div_top_tab.classList.add('div-top-tab')-->
<!--// }-->


<!--// let job_detail = document.getElementById('job_detail');-->
<!--// job_detail.classList.remove('job-detail')-->
<!--// job_detail.classList.remove('job-detail-bottom')-->
<!--// void job_detail.offsetWidth;-->
<!--// if (isDownUp) {-->
<!--//     job_detail.classList.add('job-detail-bottom')-->
<!--// } else {-->
<!--//     job_detail.classList.add('job-detail')-->
<!--// }-->


<!--// let img_job1 = document.getElementById('img_job1');-->
<!--// if (img_job1){-->
<!--//     img_job1.classList.remove('img-job1')-->
<!--//     void img_job1.offsetWidth;-->
<!--//     if (isDownUp) {-->
<!--//         img_job1.classList.add('img-job1')-->
<!--//     } else {-->
<!--//         img_job1.classList.add('img-job1')-->
<!--//     }-->
<!--// }-->


<!--// let img_job2 = document.getElementById('img_job2');-->
<!--// if (img_job2){-->
<!--//     img_job2.classList.remove('img-job2')-->
<!--//     void img_job2.offsetWidth;-->
<!--//-->
<!--//     if (isDownUp) {-->
<!--//         img_job2.classList.add('img-job2')-->
<!--//     } else {-->
<!--//         img_job2.classList.add('img-job2')-->
<!--//     }-->
<!--// }-->

<!--console.log("add")-->

<!--}-->