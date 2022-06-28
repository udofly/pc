import request from '@/utils/request';


/**
 * 商品详情
 */
export async function apiGoodsDetail(params: object) {
    return request({
        url: '/api/account/goods/detail',
        params
    });
}
