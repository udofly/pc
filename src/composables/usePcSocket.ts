import { onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { emitter } from '@popjs/core/bus/mitt';
import { EM_PC_READ_MESSAGE, IM_ACTION, IM_CONNECTED, IM_DISCONNECTED, IM_MESSAGE, IM_USER_INFO, socket } from "@/utils/socket";

/**
 * Socket 事件
 */
export function usePcSocket() {
    const store = useStore();

    emitter.on(IM_CONNECTED, () => {
        store.dispatch('pc/ImConnected').then();
    });

    emitter.on(IM_DISCONNECTED, () => {
        store.dispatch('pc/ImDisconnect').then();
    });
    emitter.on(IM_MESSAGE, (data) => {
        emitter.emit(EM_PC_READ_MESSAGE, data)
        store.dispatch('pc/ImMessage', data).then()
    });

    emitter.on(IM_ACTION, (data) => {
        store.dispatch('pc/ImAction', data).then()
    });

    emitter.on(IM_USER_INFO, (data) => {
        store.dispatch('pc/ImLogin', data).then()
    });


    const connect = (token: any) => {
        if (!token) {
            return;
        }
        /* @ts-ignore */
        socket.query.token = token;
        if (!socket.connected) {
            socket.connect();
        }
    }

    const onEmitResp = function (response: socketEmitMessage.Response) {
        console.log('🏂🏻 🏂🏻 🏂  👈 ', response);
        if (get(response, 'status') !== 0) {
            ElMessage.warning(get(response, 'message'));
            return;
        }
        store.commit('pc/NEW_MESSAGE', get(response, 'data'))
    }


    // 监听变化, 进行连接
    onMounted(() => {
        connect(store.state.pc.imToken);
    })
    watch(() => store.state.pc.imToken, (newVal) => {
        connect(newVal);
    })

    // 监听 emit 信息, 并且触发和socket 的向上提交
    watch(() => store.state.pc.emit, ({ action, message, callback }) => {
        socket.emit(action, message, function (resp) {
            console.log('🏂🏻 🏂🏻 🏂🏻 🗣 ', action, message);
            onEmitResp(resp);
            if (typeof callback === 'function') {
                callback(resp)
                console.log('🏂🏻 🏂🏻 🏂🏻 🗣 : 👂', resp);
            }
        });
    })
}

