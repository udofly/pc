<template>
    <div class="company-content ">
        <div class="company-desc">
            <img src="../../assets/img/join/ic_company_title.png">
            <div class="div-company">
                <p>- 我们实行扁平化管理，反对“办公室文化”和形式主义。</p>
                <p>- 我们根据能力和贡献来安排调薪和升职，而不是年龄和资历。</p>
                <p>- 我们认为所有岗位都应深入了解业务且为其服务，因为只有业务获得营收，我们才有钱提供报酬和福利。</p>
                <p>- 我们不提供“稳定性”，我们的业务和方向可能会发生变化，每个人都需要根据变化去主动学习新的知识和技能，而不是局限在公司既定的职位体系中。</p>
                <p>- 我们不认可“家文化”，我们希望员工通过战斗获得成就与回报，同时不要奢望他人像对待亲人一样有耐心容忍你的错误。</p>
                <p>- 我们讨厌“婴儿员工”，每个人接到任务后都应主动做好规划和沟通，而不是等待别人的催促。</p>
                <p>- 我们提倡坦诚沟通，认为私下抱怨毫无意义，当你无法容忍问题时，要么想办法解决，要么向上公开反馈，要么就离开。</p>

            </div>
        </div>
    </div>

</template>

<script lang="ts" setup></script>

<style lang="less">

.company-content {
    width: 100vw;
    height: 544px;

    .company-desc {
        position: absolute;
        left: 50%;
        margin-left: -400px;
        width: 900px;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: 0.5s translate 1 forwards;
        opacity: 0.5;
        img {
            width: 125px;
            height: 29px;
            margin-top: 10px;
        }
        .div-company {
            color: #FFF;
            font-size: 16px;
            margin-top: 20px;
            width: 800px;
            margin-left: 50px;
        }
    }

}


@keyframes translate {
    0% {
        opacity: 0.5
    }
    100% {
        opacity: 1;
        transform: translate(-50px, 0);
        -webkit-transform: translate(-50px, 0);
    }
}

</style>
