import { ElMessage } from 'element-plus';
import { get } from 'lodash-es';


export const pcError = (message: string) => {
    ElMessage.error(message);
}

export const pcToast = (message: string, success: boolean) => {
    if (success) {
        ElMessage.success(message)
    } else {
        ElMessage.warning(message);
    }
}


export const imLastMsg = function (item: any) {
    if (get(item, 'type') === 0) {
        return get(item, 'body')
    }
    if (get(item, 'type') === 1) {
        return '[图片]'
    }
    if (get(item, 'type') === 3) {
        return '[视频]'
    }
    if (get(item, 'type') === 100) {
        let body = JSON.parse(get(item, 'body'));
        return `@${get(body, 'title')}`
    }
}

/**
 * 获取客服的备注
 * @param from
 */
export const imKfRemark = function (from: any) {
    // ext: ""
    // icon: "https://test-oss.iliexiang.com/dev/default/202107/28/16/5851R6T8JuGE.png"
    // name: "E-_000000100"
    // uid: "72pe58pv"
    if (get(from, 'ext')) {
        let body = JSON.parse(get(from, 'ext'));
        if (get(body, 'kf_team_remarks')) {
            return get(body, 'kf_team_remarks')
        }
    }
    return get(from, 'name');
}


/**
 * 自定义消息的发送
 * @param from
 * @param to
 * @param body
 */
export const imMsgCustom = function (from: string, to: string, body: object) {
    return {
        from,
        to,
        ope: '1',
        type: '100',
        body: JSON.stringify(body)
    }
}

/**
 * 图片发送
 * @param from
 * @param to
 * @param url
 */
export const imMsgImage = function (from: string, to: string, url: string) {
    return {
        from,
        to,
        ope: '1',
        type: '1',
        body: JSON.stringify({
            url: url
        })
    }
}

/**
 * 图片视频
 * @param from
 * @param to
 * @param url
 */
export const imMsgVideo = function (from: string, to: string, url: string) {
    return {
        from,
        to,
        ope: '1',
        type: '3',
        body: JSON.stringify({
            url: url
        })
    }
}

/**
 * 纯文本
 * @param from
 * @param to
 * @param body
 */
export const imMsgText = function (from: string, to: string, body: string) {
    return {
        from,
        to,
        ope: '1',
        type: '0',
        body
    }
}
