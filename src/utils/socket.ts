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
    console.log('ππ» ππ» π  ππ» θΏζ₯ζε');
    emitter.emit(IM_CONNECTED)
});

socket.on('connect_error', (error: any) => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'connect_error',
        reason: error
    })
    console.log('ππ» ππ» π π ', 'connect_error', error);
});
socket.on('connect_timeout', (timeout: any) => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'connect_timeout',
        reason: timeout
    })
    console.log('ππ» ππ» π π ', 'connect_timeout', timeout);
});
socket.on('disconnect', () => {
    emitter.emit(IM_DISCONNECTED, {
        type: 'disconnect'
    })
});

socket.on('error', (error: any) => {
    console.log('ππ» ππ» π π ', 'error', error);
    emitter.emit(IM_DISCONNECTED, {
        type: 'error',
        reason: error
    })
});

//ηε¬ζΆζ―ι’ι
socket.on('message', (data: {}) => {
    console.log('ππ» ππ» π  π§π»', data);
    emitter.emit(IM_MESSAGE, data)
});

socket.on('action', (data: {}) => {
    console.log('ππ» ππ» ππ» π ', data);
    emitter.emit(IM_ACTION, data)
});

// θΏζ₯ζεδΉεθ·εη¨ζ·δΏ‘ζ―
socket.on('userInfo', (data: {}) => {
    console.log('ππ» ππ» ππ» π ', data);
    emitter.emit(IM_USER_INFO, data)
});


export const emitTo = function (action: string, obj: object, callback?: object) {
    socket.emit(action, obj, function (resp: any) {
        console.log('ππ» ππ» ππ» π£ ', action, obj);
        if (typeof callback === 'function') {
            callback(resp)
            console.log('ππ» ππ» ππ» π£ : π', resp);
        }
    });
}


export const IM_ACTION = 'im:action';// ε­ε¨ε¨δ½
export const IM_ACTION_MESSAGE_REFRESH = 'im:action:message-refresh';// ε·ζ°ζ€ε
export const IM_MESSAGE = 'im:message';// ζΆζ―
export const IM_CONNECTED = 'im:connected';// ε·²θΏζ₯
export const IM_DISCONNECTED = 'im:disconnected';// ζ­θΏ
export const IM_USER_INFO = 'im:user-info';   // θ·εη¨ζ·δΏ‘ζ―


export const EM_PC_ORDER_REFRESH = 'pc:order-refresh';
export const EM_PC_USER_REFRESH = 'pc:user-refresh';
export const EM_PC_CHAT_INPUT = 'pc:chat-input';

export const EM_PC_REFRESH_SHORT_MSG = 'pc:refresh_short_msg';
export const EM_PC_CALL_MESSAGE = 'pc:call_message';//ιη₯ζ€εζΆζ―
export const EM_PC_CALL_NOREADMESSAGE = 'pc:call_no_read_message';
export const EM_PC_RECEIVE_READ_MESSAGE = 'pc:receive_read_message';//ζΆε°ζ΄ζ°
export const EM_PC_READ_MESSAGE = 'pc:read_message';//ειεζ§

export const EM_PC_VIDEO_SEND = 'pc:video_send';//pcε?’ζειθ§ι’
export const EM_PC_VIDEO_SEND_SUCCESS = 'pc:video_send_success';//pcε?’ζειθ§ι’ζε
export const EM_PC_VIDEO_SEND_FAILURE = 'pc:video_send_failure';//pcε?’ζειθ§ι’ζε
