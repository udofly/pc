<template>
    <div class="border">
        <h4 class="phase-title">用户信息 </h4>
        <el-scrollbar class="phase" v-if="trans.success" v-loading="trans.loading">
            <div class="user-card">
                <div class="card-pic">
                    <img :src="transOrder.avatar" alt="昵称"/>
                    <div class="card-info">
                        {{ transOrder.nickname }} <br>
                        <span class="card-id"> 用户ID : {{ transOrder.account_id }}</span>
                    </div>
                </div>
                <ul>
                    <li><span>身 份1</span>: {{ transOrder.identity_desc }}</li>
                    <li><span>手 机 号</span>:
                        <ImFnUserSendSMS
                            :show-mobile="trans.showMobile"
                            :mobile="transOrder.mobile"
                            type="user"
                            :account-id="transOrder.account_id"
                            @clickEye="onclickEye"/>
                    </li>
                    <li><span>实名状态</span>: {{ transOrder.is_chid === 'N' ? '未实名' : '已实名' }}</li>
                    <li><span>分配客服</span>: {{ transOrder.kf_nickname }}</li>
                    <li><span>实名年龄</span>: {{ transOrder.age }}</li>
                </ul>
            </div>
            <h4>商品</h4>
            <p class="empty" v-if="isEmpty(transOrder.goods)">暂无</p>
            <ul class="goods" v-else>
                <li v-for="item in transOrder.goods" :key="get(item, 'id')"
                    @click="onView(`${get(item, 'game')}   ${get(item, 'id')}`, get(item, 'url'))">
                    {{ `${get(item, 'game')} : ${get(item, 'id')}` }}
                    <span>{{ `/${get(item, 'type_desc')}/${get(item, 'status_desc')}` }}</span>
                </li>
            </ul>
            <h4>出售订单</h4>
            <p class="empty" v-if="isEmpty(transOrder.sell_order)">暂无</p>
            <ul class="goods" v-else>
                <li v-for="item in transOrder.sell_order" :key="item"
                    @click="onView(`${get(item, 'game')}   ${get(item, 'id')}`,  get(item, 'url'))">
                    {{ `${get(item, 'game')} : ${get(item, 'id')}` }}
                    <span>{{ `/${get(item, 'type_desc')}/${get(item, 'status_desc')}` }}</span>
                </li>
            </ul>
            <h4>购买订单</h4>
            <p class="empty" v-if="isEmpty(transOrder.buy_order)">暂无</p>
            <ul class="goods" v-else>
                <li v-for="item in transOrder.buy_order" :key="item"
                    @click="onView(`${get(item, 'game')}   ${get(item, 'id')}`,  get(item, 'url'))">
                    {{ `${get(item, 'game')} : ${get(item, 'id')}` }}
                    <span>{{ `/${get(item, 'type_desc')}/${get(item, 'status_desc')}` }}</span>
                </li>
            </ul>
            <h4>竞价</h4>
            <p class="empty" v-if="isEmpty(transOrder.bid)">暂无</p>
            <ul class="goods" v-else>
                <li v-for="item in transOrder.bid" :key="item"
                    @click="onView(`${item.game} ${item.id}`,  get(item, 'url'))">
                    {{ `${item.game} : ${item.id}` }}
                    <span> {{ `/${item.status_desc}` }}</span>
                </li>
            </ul>
            <h4>鉴定</h4>
            <p class="empty" v-if="isEmpty(transOrder.estimate)">暂无</p>
            <ul class="goods" v-else>
                <li v-for="item in transOrder.estimate" :key="item"
                    @click="onView(`${item.game} ${item.id}`,  get(item, 'url'))">
                    {{ `${item.game} : ${item.id} ` }}
                    <span> {{ `/${item.time}` }}</span>
                </li>
            </ul>
        </el-scrollbar>
        <ElEmpty :image="themeAssets('empty')" :image-size="60" :description="trans.message" v-else/>
    </div>
    <im-frame :title="transView.title" v-model:visible="transView.visible" :url="transView.url"/>


</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { get, isEmpty } from 'lodash-es';
import { apiMiscChatUserInfo } from '@/services/pc';
import { useStore } from '@/store';
import ImFrame from '@/components/pc/ImFrame.vue';
import {emitter } from '@popjs/core/bus/mitt';
import ImFnUserSendSMS from '@/components/pc/im-fn/ImFnUserSendSMS.vue';
import { themeAssets } from "@/utils/utils";
import { EM_PC_USER_REFRESH } from "@/utils/socket";

const store = useStore();
const trans = reactive({
    success: true,
    showMobile: false,
    message: '',
    session: computed(() => store.state.pc.session),
    loading: computed(() => store.getters.loading)
})

const transView = reactive({
    title: '',
    visible: false,
    url: ''
})

const transOrder = reactive({
    avatar: themeAssets('logo'),
    nickname: '',
    kf_nickname: '',
    identity_desc: '',
    account_id: '',
    mobile: '',
    sell_order: [],
    buy_order: [],
    goods: [],
    bid: [],
    estimate: [],
    is_chid: 'N',
    age: 0
})

const onclickEye = function () {
    trans.showMobile = !trans.showMobile
}

/**
 * 返回的数据的信息
 //  account_id: 130
 //  age: 0
 //  avatar: "https://test-oss.iliexiang.com/dev/default/202108/10/21/3347wTLRcT56.png"
 //  buy_order: []
 //  chid_type: ""
 //  estimate: []
 //  goods: []
 //  identity: "user"
 //  identity_desc: "散户"
 //  is_chid: "N"
 //  mobile: "15623333333"
 //  nickname: "KR_000000130"
 //  sell_order: []
 */
const fetchDetail = () => {
    store.dispatch('Loading')
    if (!trans.session) {
        return;
    }
    apiMiscChatUserInfo({
        im_tid: get(trans.session, 'tid')
    }).then(({ data, success, message }) => {
        trans.success = success;
        trans.message = message;
        if (success) {
            transOrder.avatar = get(data, 'avatar', '');
            transOrder.kf_nickname = get(data, 'kf_nickname', '');
            transOrder.nickname = get(data, 'nickname', '');
            transOrder.identity_desc = get(data, 'identity_desc', '');
            transOrder.account_id = get(data, 'account_id', 0);
            transOrder.mobile = get(data, 'mobile', '');
            transOrder.sell_order = get(data, 'sell_order', []);
            transOrder.buy_order = get(data, 'buy_order', []);
            transOrder.bid = get(data, 'bid', []);
            transOrder.goods = get(data, 'goods', []);
            transOrder.estimate = get(data, 'estimate', []);
            transOrder.is_chid = get(data, 'is_chid', 'N');
            transOrder.age = get(data, 'age', 0);
        }
    })
}

const onView = (title: any, url: any) => {
    transView.visible = true;
    transView.title = title;
    transView.url = url;
}

onMounted(fetchDetail);

// 收到刷新订单的请求, 来自于Socket
emitter.on(EM_PC_USER_REFRESH, function () {
    fetchDetail()
})

watch(() => store.state.pc.session, (newVal) => {
    if (!newVal) {
        return;
    }
    fetchDetail();
    trans.showMobile = false;
})


const offBus = () => {
    emitter.off(EM_PC_USER_REFRESH)
}

onUnmounted(offBus)

</script>
<style scoped lang="less">

.img-eye {
    width: 16px;
    height: 16px
}

.border {
    height: 100vh;
    border-right: 1px solid #EFEFEF;
}

.phase-title {
    background: rgba(0, 30, 255, 0.08);
    color: #151515;
    height: 44px;
    line-height: 44px;
    text-align: center;
    margin: 0 !important;
    padding: 0 !important;
}

.phase {
    height: calc(100vh - 44px);
    overflow-y: auto;

}

.user-card {
    background: var(--pc-color-theme);
    color: #FFF;
    .card-pic {
        display: flex;
        padding: 16px 10px 10px;
        align-items: center;
        .card-id {
            font-size: 12px;
        }
        img {
            border-radius: 50%;
            height: 56px;
            width: 56px;
            border: 2px solid #FFF;
            margin-right: 10px;
        }
    }
    ul {
        line-height: 24px;
        padding: 0 10px 10px;
        li {
            list-style: none;
        }
        span {
            &:first-child {
                min-width: 60px;
                text-align: justify;
                display: inline-block;
            }
            &:nth-child(2) {
                text-align: justify;
                width: 30px;
                height: 14px;
                text-align: center;
                font-size: 8px;
                line-height: 14px;
                margin-left: 4px;
                display: inline-block;
                border: 1px solid #FFF;
                border-radius: 2px;
            }

        }
    }
}

h4 {
    font-size: 14px;
    line-height: 20px;
    color: #151515;
    padding: 0 12px;
    margin-top: 8px;
}

.empty {
    font-size: 12px;
    color: rgba(84, 104, 255, 0.6);
    padding: 3px 12px;
}

.goods {
    padding: 0 12px;
    li {
        list-style: none;
        color: var(--pc-color-theme);
        vertical-align: baseline;
        cursor: pointer;
        &:hover {
            color: var(--pc-color-theme-dark);
        }
    }
    span {
        font-size: 12px;
    }
}
</style>
