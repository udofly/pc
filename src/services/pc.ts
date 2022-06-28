import request from '@/utils/request';

/**
 * 在线客服列表
 */
export function apiPcKfOnlineList() {
    return request({
        url: '/api/misc/kf/online_list'
    });
}

/**
 * 转接客服
 */
export function apiPcUserDistributeKf(params: any) {
    return request({
        url: '/api/user/user/distribute_kf',
        params
    });
}


/**
 * 客服快捷短语
 */
export function apiPcUserShortcutPhrase(params: any) {
    return request({
        url: '/api/misc/shortcut_phrase/list',
        params
    });
}

/**
 * 客服聊天用户信息
 */
export function apiMiscChatUserInfo(params: any) {
    return request({
        url: '/api/misc/chat/user_info',
        params
    });
}

/**
 * 客服聊天的订单信息
 * @param params
 */
export function apiMiscChatOrderInfo(params: any) {
    return request({
        url: '/api/misc/chat/order_info',
        params
    });
}

/**
 * 邀请填写包赔  模板
 */
export async function apiMiscChatInviteEnsureIndemnity() {
    return request({
        url: '/api/misc/chat/ensure_template'
    });
}

/**
 * 邀请填写包赔
 */
export async function apiMiscChatInviteFillIndemnity(params: any) {
    return request({
        url: '/api/misc/chat/invite_fill_indemnity',
        params
    });
}

/**
 * 客服发送@消息
 */
export async function apiMiscChatSendAtMessage(params: any) {
    return request({
        url: '/api/misc/chat/send_at_message',
        params
    });
}

/**
 * 客服发送拍一拍消息
 * @param params
 */
export async function apiMiscChatSendPatMessage(params: any) {
    return request({
        url: '/api/misc/chat/send_pat_message',
        params
    });
}

/**
 * 合同模板
 * @param params
 */
export async function apiMiscChatContractTemplate(params: any) {
    return request({
        url: '/api/misc/chat/contract_template',
        params
    });
}

/**
 * 邀请签署合同
 * @param params
 */
export async function apiMiscChatInviteSignContract(params: any) {
    return request({
        url: '/api/misc/chat/invite_sign_contract',
        params
    });
}

/**
 * 搜索用户
 * @param params
 */
export async function apiMiscChatFindUser(params: any) {
    return request({
        url: '/api/misc/chat/find_user',
        params
    });
}

/**
 * 客服发起聊天前置接口
 * @param params
 */
export async function apiMiscChatKfChatPre(params: any) {
    return request({
        url: '/api/misc/chat/kf_chat_pre',
        params
    });
}

/**
 * 客服设置群备注, 这里参数 kf 写死
 * @param params
 */
export async function apiMiscChatTeamRemarks(params: any) {
    return request({
        url: '/api/misc/chat/team_remarks',
        params: {
            ...params,
            from: 'kf'
        }
    });
}

/**
 * 客服短信列表
 * @param params
 */
export async function apiMiscSMSList() {
    return request({
        url: '/api/misc/kf_sms/list'
    });
}

/**
 * 客服短信发送
 * @param params
 */
export async function apiMiscSMSSend(params: any) {
    return request({
        url: '/api/misc/kf_sms/send',
        params
    });
}

/**
 * 手机号/包赔 - 记录
 * @param params
 */
export async function apiMiscRecord(params: any) {
    return request({
        url: '/api/misc/chat/show_record',
        params
    });
}

/**
 * 是否可以换绑 监测
 * @param params
 */
export async function apiSwapCheck(params: any) {
    return request({
        url: '/api/misc/chat/swap_check',
        params
    });
}
