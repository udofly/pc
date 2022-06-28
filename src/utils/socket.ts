import io from 'socket.io-client';
import { imApiUrl, imAppKey } from "@/utils/conf";
import { emitter } from "@popjs/core/bus/mitt";

export const socket: SocketIOClient.Socket = io(imApiUrl, {
    transports: ['websocket'],
    reconnection: true,
    autoConnect: false,
    query: {
        app_key: imAppKey,
        token: ''
    }
})

// socket.disconnected
socket.on('connect', () => {
    console.log('🏂🏻 🏂🏻 🏂  👌🏻 连接成功');
    emitter.emit(IM_CONNECTED)
});

socket.on('connect_error', (error: any) => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'connect_error',
        reason: error
    })
    console.log('🏂🏻 🏂🏻 🏂 💀 ', 'connect_error', error);
});
socket.on('connect_timeout', (timeout: any) => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'connect_timeout',
        reason: timeout
    })
    console.log('🏂🏻 🏂🏻 🏂 💀 ', 'connect_timeout', timeout);
});
socket.on('disconnect', () => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'disconnect'
    })
});

socket.on('error', (error: any) => {
    console.log('🏂🏻 🏂🏻 🏂 💀 ', 'error', error);
    emitter.emit(IM_DISCONNECTED, {
        type: 'error',
        reason: error
    })
});

//监听消息频道
socket.on('message', (data: {}) => {
    console.log('🏂🏻 🏂🏻 🏂  🧚🏻', data);
    emitter.emit(IM_MESSAGE, data)
});

socket.on('action', (data: {}) => {
    console.log('🏂🏻 🏂🏻 🏂🏻 👏 ', data);
    emitter.emit(IM_ACTION, data)
});

// 连接成功之后获取用户信息
socket.on('userInfo', (data: {}) => {
    console.log('🏂🏻 🏂🏻 🏂🏻 🙍 ', data);
    emitter.emit(IM_USER_INFO, data)
});


export const emitTo = function (action: string, obj: object, callback?: object) {
    socket.emit(action, obj, function (resp: any) {
        console.log('🏂🏻 🏂🏻 🏂🏻 🗣 ', action, obj);
        if (typeof callback === 'function') {
            callback(resp)
            console.log('🏂🏻 🏂🏻 🏂🏻 🗣 : 👂', resp);
        }
    });
}


export const IM_ACTION = 'im:action';// 存在动作
export const IM_ACTION_MESSAGE_REFRESH = 'im:action:message-refresh';// 刷新撤回
export const IM_MESSAGE = 'im:message';// 消息
export const IM_CONNECTED = 'im:connected';// 已连接
export const IM_DISCONNECTED = 'im:disconnected';// 断连
export const IM_USER_INFO = 'im:user-info';   // 获取用户信息


export const EM_PC_ORDER_REFRESH = 'pc:order-refresh';
export const EM_PC_USER_REFRESH = 'pc:user-refresh';
export const EM_PC_CHAT_INPUT = 'pc:chat-input';

export const EM_PC_REFRESH_SHORT_MSG = 'pc:refresh_short_msg';
export const EM_PC_CALL_MESSAGE = 'pc:call_message';//通知撤回消息
export const EM_PC_CALL_NOREADMESSAGE = 'pc:call_no_read_message';
export const EM_PC_RECEIVE_READ_MESSAGE = 'pc:receive_read_message';//收到更新
export const EM_PC_READ_MESSAGE = 'pc:read_message';//发送回执

export const EM_PC_VIDEO_SEND = 'pc:video_send';//pc客服发送视频
export const EM_PC_VIDEO_SEND_SUCCESS = 'pc:video_send_success';//pc客服发送视频成功
export const EM_PC_VIDEO_SEND_FAILURE = 'pc:video_send_failure';//pc客服发送视频成功
