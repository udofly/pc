<template>
    <div class="x--pc-ic">
        <div class="time" v-if="true">{{ time }}</div>
        <div class="order-content" v-if="get(body, 'goods_id')">
            <div class="x--pc-goods" @click="goOrderDetail">
                <p class="goods-status">
                    <img :src="body.game_thumb" alt="#title#">
                    {{ body.game_area }}{{ body.game_server }}
                    <span>{{ body.goods_status }}</span>
                </p>
                <p class="goods-title">
                    {{ body.game_nick }}
                    <span>¥{{ body.goods_price }}</span>
                </p>
                <p class="goods-sub">
                    {{ body.sub_title }}
                </p>
            </div>
            <div class="order-id">商品编号:{{ body.goods_id }}</div>
        </div>
        <div class="order-content content-empty" v-else style="font-size: 12px;">
            无法从消息中获取商品信息, 请联系开发者纠错
        </div>
    </div>
    <ImFrame :url="trans.popUrl" :visible="trans.visiblePopOrder" title="商品详情"/>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { get } from 'lodash-es';
import ImFrame from '@/components/pc/ImFrame.vue';
import { apiGoodsDetail } from '@/services/goods';
import { pcToast } from "@/utils/pc";

const props = defineProps({
    from: Object,
    body: Object,
    content: Object,
    time: String
});

const trans = reactive({
    visiblePopOrder: false,
    popUrl: ''
})
const goOrderDetail = function () {

    trans.visiblePopOrder = false;

    //新商品,直接在消息中带有字段
    if (get(props.body, 'goods_info_url')) {
        trans.popUrl = get(props.body, 'goods_info_url')
        setTimeout(() => {
            trans.visiblePopOrder = true
        }, 500)
    }
    //老商品,现请求详情.再去获取url
    else {
        apiGoodsDetail({
            id: get(props.body, 'goods_id')
        }).then(resp => {
            if (resp.success) {
                trans.popUrl = get(resp.data, 'goods_info_url')
                setTimeout(() => {
                    trans.visiblePopOrder = true
                }, 500)
            } else {
                pcToast(resp.message, false);
            }
        });
    }
}


</script>

<style scoped lang="less">

.order-content {
    padding: 15px;
    background-color: white;
    border-radius: 15px;
    &.content-empty {
        font-size: 12px;
    }
}

.order-id {
    color: #C4C9CF;
    font-size: 12px;
    margin-top: 10px;
}


</style>
