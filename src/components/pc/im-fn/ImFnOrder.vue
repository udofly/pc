<template>
    <div class="border x--pc-order">
        <h4 class="phase-title">交易信息</h4>
        <el-scrollbar class="phase" v-if="trans.success" v-loading="trans.loading">
            <div class="order">
                <ul>
                    <li @click="trans.visible=true" style="cursor: pointer;"><span>订单ID</span> : {{ transOrder.order_id }}</li>
                    <li @click="trans.visibleGoods=true" style="cursor: pointer;"><span>商品ID</span> : {{ transOrder.goods_id }}</li>
                    <li><span>分配客服</span> : {{ transOrder.kf_nickname }}</li>
                    <li><span>订单状态</span> : {{ transOrder.order_status_desc }}</li>
                    <li><span>订单类型</span> : {{ transOrder.order_type_desc }}</li>
                    <li><span>包赔材料</span> : {{ transOrder.have_contacts === 'Y' ? '已填写' : '未填写' }}</li>
                </ul>
                <div class="order-btn">
                    <im-fn-order-fill-indemnity :order-id="transOrder.order_id" :visible="transOrder.contacts_status !== 'Y'"
                        :identity="transOrder.seller_identity"/>
                    <im-fn-order-view-url :visible="transOrder.contacts_status === 'Y'" title="查看包赔"
                        :url="transOrder.contacts_url" :order-id="transOrder.order_id"/>
                    <im-fn-order-sign-contract :order-id="transOrder.order_id" :visible="transOrder.contract_status !== 'Y'"/>
                    <im-fn-order-view-url :url="transOrder.contract_url" :visible="transOrder.contract_status === 'Y'" title="查看合同"/>
                    <im-fn-order-view-url :url="transOrder.swap_info_url" :visible="true" title="换绑信息"/>
                    <im-fn-order-view-url :url="transOrder.swap_over_url" :visible="true" :ban="transOrder.is_swap_over === 'Y'"
                        title="换绑完成" :order-id="transOrder.order_id"/>
                    <im-fn-order-at :tid="get(trans.session, 'tid')" type="buyer"/>
                    <im-fn-order-at :tid="get(trans.session, 'tid')" type="seller"/>
                </div>
                <im-frame v-model:visible="trans.visible" :title="`订单ID: ${transOrder.order_id}`" :url="transOrder.detail_url"/>
                <im-frame v-model:visible="trans.visibleGoods" :title="`商品ID: ${transOrder.goods_id}`" :url="transOrder.goods_info_url"/>
            </div>
            <div class="sell-card user-card">
                <h4>卖家信息</h4>
                <div class="card-pic">
                    <img :src="get(transOrder.seller, 'avatar')" :alt="get(transOrder.seller, 'nickname')"/>
                    <div class="card-info">
                        {{ get(transOrder.seller, 'nickname') }} <br>
                        <span class="card-id"> 用户ID : {{ get(transOrder.seller, 'account_id') }} </span>
                    </div>
                </div>
                <ul>
                    <li><span>身 份</span> : {{ get(transOrder.seller, 'identity') === 'enterprise' ? '商户' : '散户' }}</li>
                    <li><span>手 机 号</span> :
                        <ImFnUserSendSMS
                            :show-mobile="trans.showMobileSeller"
                            :mobile="get(transOrder.seller, 'mobile')"
                            type="order"
                            :account-id="get(transOrder.seller, 'account_id')"
                            @clickEye="onclickEye('sell')"/>
                    </li>
                    <li><span>实名状态</span> : {{ get(transOrder.seller, 'is_chid') === 'N' ? '未实名' : '已实名' }}</li>
                    <li><span>实名年龄</span> : {{ get(transOrder.seller, 'age') }}</li>
                </ul>
            </div>
            <div class="buy-card user-card">
                <h4>买家信息</h4>
                <div class="card-pic">
                    <img :src="get(transOrder.buyer, 'avatar')" :alt="get(transOrder.buyer, 'nickname')"/>
                    <div class="card-info">
                        {{ get(transOrder.buyer, 'nickname') }} <br>
                        <span class="card-id"> 用户ID : {{ get(transOrder.buyer, 'account_id') }} </span>
                    </div>
                </div>
                <ul>
                    <li><span>身 份</span> : {{ get(transOrder.buyer, 'identity') === 'enterprise' ? '商户' : '散户' }}</li>
                    <li><span>手 机 号</span> :
                        <ImFnUserSendSMS
                            :show-mobile="trans.showMobileBuyer"
                            :mobile="get(transOrder.buyer, 'mobile')"
                            type="order"
                            :account-id="get(transOrder.buyer, 'account_id')"
                            @clickEye="onclickEye('buy')"/>

                    </li>
                    <li><span>实名状态</span> : {{ get(transOrder.buyer, 'is_chid') === 'N' ? '未实名' : '已实名' }}</li>
                    <li><span>实名年龄</span> : {{ get(transOrder.buyer, 'age') }}</li>
                </ul>
            </div>
        </el-scrollbar>
        <el-empty :image="themeAssets('empty')" :image-size="60" :description="trans.message" v-else/>
    </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';
import { get } from 'lodash-es';
import { apiMiscChatOrderInfo } from '@/services/pc';
import { useStore } from '@/store';
import ImFnOrderFillIndemnity from '@/components/pc/im-fn/ImFnOrderFillIndemnity.vue';
import ImFnOrderSignContract from '@/components/pc/im-fn/ImFnOrderSignContract.vue';
import ImFnOrderViewUrl from '@/components/pc/im-fn/ImFnOrderViewUrl.vue';
import ImFnOrderAt from '@/components/pc/im-fn/ImFnOrderAt.vue';
import ImFrame from '@/components/pc/ImFrame.vue';
import { emitter } from '@popjs/core/bus/mitt';
import ImFnUserSendSMS from '@/components/pc/im-fn/ImFnUserSendSMS.vue';
import { themeAssets } from "@/utils/utils";
import { EM_PC_ORDER_REFRESH } from "@/utils/socket";

const store = useStore();
const trans = reactive({
    session: computed(() => {
        return store.state.pc.session
    }),
    success: true,
    visible: false,
    showMobileSeller: false,
    showMobileBuyer: false,
    message: '',
    loading: computed(() => store.getters.loading)
})


const transOrder = reactive({
    'goods_id': 0,
    'goods_info_url': 0,
    'order_id': 0,
    'order_type': 0,
    'order_type_desc': '',
    'order_status': 0,
    'order_status_desc': '',
    'have_contacts': '',
    'contacts_status': '',
    'contacts_url': '',
    'contract_status': 'N',
    'contract_url': '',
    'detail_url': '',
    'swap_info_url': '',
    'swap_over_url': '',
    'seller_identity': '',
    'is_swap_over': '',
    'kf_nickname': '',
    'seller': {
        'account_id': 0,
        'nickname': '',
        'avatar': themeAssets('logo'),
        'mobile': '',
        'is_chid': '',
        'chid_type': '',
        'age': 0,
        'identity': ''
    },
    'buyer': {
        'account_id': 0,
        'nickname': '',
        'avatar': themeAssets('logo'),
        'mobile': '',
        'is_chid': '',
        'chid_type': '',
        'age': 0,
        'identity': ''
    }
})

const fetchDetail = () => {
    store.dispatch('Loading')
    if (!trans.session) {
        return;
    }
    apiMiscChatOrderInfo({
        im_tid: get(trans.session, 'tid')
    }).then(({ data, success, message }) => {
        trans.success = success;
        trans.message = message
        if (success) {
            transOrder.goods_id = get(data, 'goods_id');
            transOrder.goods_info_url = get(data, 'goods_info_url');
            transOrder.order_id = get(data, 'order_id');
            transOrder.order_type = get(data, 'order_type');
            transOrder.kf_nickname = get(data, 'kf_nickname');
            transOrder.order_type_desc = get(data, 'order_type_desc');
            transOrder.order_status = get(data, 'order_status');
            transOrder.order_status_desc = get(data, 'order_status_desc');
            transOrder.have_contacts = get(data, 'have_contacts');
            transOrder.contacts_status = get(data, 'contacts_status');
            transOrder.contacts_url = get(data, 'ensure_url');
            transOrder.contract_status = get(data, 'contract_status');
            transOrder.contract_url = get(data, 'contract_url');
            transOrder.swap_info_url = get(data, 'swap_info_url');
            transOrder.swap_over_url = get(data, 'swap_over_url');
            transOrder.is_swap_over = get(data, 'is_swap_over');
            transOrder.detail_url = get(data, 'order_info_url');
            transOrder.seller = get(data, 'seller');
            transOrder.buyer = get(data, 'buyer');
            transOrder.seller_identity = get(data, 'seller.identity');
        }
    })
}

onMounted(fetchDetail);

// 收到刷新订单的请求, 来自于Socket
emitter.on(EM_PC_ORDER_REFRESH, function () {

    fetchDetail()
})

watch(() => store.state.pc.session, () => {
    fetchDetail();
    trans.showMobileBuyer = false;
    trans.showMobileSeller = false;
})

const offBus = () => {
    emitter.off(EM_PC_ORDER_REFRESH)
}

const onclickEye = function (type: String) {
    if (type === 'buy') {
        trans.showMobileBuyer = !trans.showMobileBuyer
    } else {
        trans.showMobileSeller = !trans.showMobileSeller
    }

}

onUnmounted(offBus)

</script>
<style scoped lang="less">

.border {
    border-right: 1px solid var(--pc-color-bg-main);
    height: calc(100vh);
}

.phase-title {
    background: rgba(0, 30, 255, 0.08);
    color: #151515;
    height: 44px;
    line-height: 44px;
    text-align: center;
    margin-bottom: 0;
}

.phase {
    height: calc(100vh - 44px);
    overflow-y: auto;
}

.buy-card h4, .sell-card h4 {
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 12px;
}

.buy-card {
    h4 {
        border-top: 1px solid var(--pc-color-bg-main);
        color: var(--pc-color-green);
    }
}

.sell-card {
    h4 {

        color: var(--pc-color-red-dark);
    }
}

.user-card {
    color: var(--k-color-black);
    .card-pic {
        display: flex;
        padding: 0 10px 10px;
        align-items: center;
        .card-id {
            font-size: 12px;
        }
        img {
            border-radius: 50%;
            height: 56px;
            width: 56px;
            margin-right: 10px;
        }
    }
    ul {
        line-height: 24px;
        padding: 0 10px 0;
        margin-bottom: 10px;
        li{
            list-style: none;
        }
        span {
            min-width: 60px;
            text-align: right;
            display: inline-block;
        }
    }
}

.order-btn {
    padding: 0 10px;
}

.order {
    padding-top: 0.5rem;
    color: var(--k-color-black);
    ul {
        line-height: 24px;
        padding: 0 10px 5px;
        margin-bottom: 0;
        list-style: none;
        li {
            list-style: none;
            line-height: 24px;
        }
        span {
            text-align: right;
            min-width: 60px;
            display: inline-block;
        }
    }
}
</style>
