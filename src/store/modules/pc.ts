import { Module } from 'vuex'
import { PcTypes, RootStateTypes } from '@/store/types'
import { clone, each, find, first, get, map, set, sortBy } from 'lodash-es';
import { appSessionStore, envLocalStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';
import { apiUserUserDetail } from '@/services/user';
import { ElMessage } from 'element-plus';
import { imKfRemark, imLastMsg, pcToast } from '@/utils/pc';
import Push from 'push.js';
import { apiImClientSessionInfo } from '@/services/im';
import { emitter } from '@popjs/core/bus/mitt';
import { EM_PC_ORDER_REFRESH, EM_PC_RECEIVE_READ_MESSAGE, EM_PC_USER_REFRESH } from "@/utils/socket";

// Create a new store Modules.
const pc: Module<PcTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        // 当前用户
        token: '',
        // 当前回话/聊天
        message: {},
        lastMsg: {},
        emit: {},         // socket 通讯数据
        // 会话列表
        tid: '',          // 会话群ID
        sessionId: '',    // 会话ID
        sessionType: '',  // 会话类型
        unReadNum: 0,     // 会话未读消息
        recentList: [],   // 会话列表
        session: {},      // 当前回话对象
        // 当前用户的
        imAccid: '',
        imToken: '',
        imUser: {},
        imConnected: false,
        imSearch: false,
        imCraft: {}
    },
    mutations: {
        /* 当前回话来了一条新消息
         * ---------------------------------------- */
        NEW_MESSAGE(state: PcTypes, message) {
            state.message = message;
        },
        /* 当前会话的最后一条消息更新
         * ---------------------------------------- */
        UPDATE_LAST_MSG(state: PcTypes, data: socketSessionMessage.Response) {
            state.lastMsg = data;
        }
    },
    actions: {
        // 有 token 则认定为登录
        Login({ commit, state, dispatch }, { token }) {
            // 保存用户的Token
            envLocalStore(storageKey.PC_TOKEN, token);
            state.token = token;

            dispatch('Fetch');
        },

        Logout({ state }) {
            ElMessage.warning('用户访问受限, 请重新登录');
            envLocalStore(storageKey.PC_TOKEN, null);
            state.token = '';
        },

        Fetch({ state }) {
            const key = storageKey.PC_USER;

            // 用户信息, 缓存, 是为了加速请求
            // 因为 request 请求需要用的哦 PC_IM_TOKEN, 所以需要保存
            let info: any = appSessionStore(key);
            if (info) {
                state.imAccid = get(info, 'im_accid');
                state.imToken = get(info, 'im_token');
                appSessionStore(storageKey.PC_IM_TOKEN, get(info, 'im_token'));
            } else {
                apiUserUserDetail({}).then(({ success, data }) => {
                    if (success) {
                        appSessionStore(storageKey.PC_USER, data);
                        appSessionStore(storageKey.PC_IM_TOKEN, get(data, 'im_token'));
                        state.imAccid = get(data, 'im_accid');
                        state.imToken = get(data, 'im_token');
                    }
                })
            }
        },

        // 用户登录之后获取IM 用户信息
        ImLogin({ state }, imUser) {
            state.imUser = imUser;
        },

        // IM 断掉链接
        ImDisconnect({ state }) {
            state.imConnected = false;
        },

        // IM 已经连接
        ImConnected({ state }) {
            state.imConnected = true;
        },

        ImAtSearch({ state }) {
            state.imSearch = true;
        },

        ImLeaveSearch({ state }) {
            state.imSearch = false;
        },

        // 接收到不同的 Action 进行处理
        ImAction({ commit, state, dispatch }, data) {
            let operation = get(data, 'operation');
            if (operation === 'sessionUpdate') {
                // 不存在则追加
                let contain = find(state.recentList, function (item) {
                    return get(item, 'tid') === get(data, 'data.tid');
                });

                if (!contain) {
                    // 收到新会话, 未存在, 增加未读数变为 1
                    let ori = get(data, 'data');
                    set(ori, 'unread_num', 1);
                    state.recentList.push(ori);
                } else {
                    // 收到新会话, 已经存在, 更新数量
                    commit('UPDATE_LAST_MSG', get(data, 'data'));
                }
            }

            // 更新会话列表的备注
            if (operation === 'sessionOppositeUpdate') {
                let session_id = get(data, 'data.session_id')
                state.recentList = map(state.recentList, function (or) {
                    if (get(or, 'session_id') === session_id) {
                        set(or, 'opposite_info', get(data, 'data.opposite_info'));
                    }
                    return or;
                });
            }

            // 回话移除
            if (operation === 'sessionDelete') {
                //{"operation":"sessionDelete","data":{"session_id":"g_220_01858440404"}}
                let session_id = get(data, 'data.session_id')
                let newRecent: any = [];
                each(state.recentList, function (or) {
                    if (get(or, 'session_id') === session_id) {
                        return;
                    }
                    newRecent.push(or);
                });
                let contain = find(newRecent, function (item) {
                    return get(item, 'tid') === state.tid;
                });
                if (!contain) {
                    let aItem: any = first(newRecent);
                    let tid = get(aItem, 'tid');
                    dispatch('ImSession', {
                        tid: tid
                    }).then(() => {
                        state.recentList = newRecent;
                    })
                }
            }

            //对方已读
            if (operation === 'messageRead') {
                emitter.emit(EM_PC_RECEIVE_READ_MESSAGE, data)
            }
        },

        // 接收到消息对列表进行追加
        ImMessage({ commit, state }, data) {
            const fromTid = get(data, 'data.content.to');
            if (Push.Permission.has()) {
                // 这里注意
                // 1. 浏览器在系统中允许通知
                // 2. 浏览器打开对本网站的通知
                // 3. 网站必须是 https
                Push.create(imKfRemark(get(data, 'data.from')), {
                    body: imLastMsg(get(data, 'data.content')),
                    icon: 'https://file.kejinshou.com/static/images/logox48.png',
                    tag: String(get(data, 'msg_id')),
                    timeout: 8000,
                    onClick: function () {
                        window.focus();
                        /* @ts-ignore */
                        this.close();
                    }
                }).then();
            }
            if (fromTid === state.tid) {
                commit('NEW_MESSAGE', data);

                // 当前回话收到消息, 刷新订单数据, 使用 mitt 触发事件
                if (get(data, 'data.content.type') === 100) {
                    const body = get(data, 'data.content.body');
                    if (body) {
                        let parsed = JSON.parse(body);
                        let title = get(parsed, 'title', '');
                        if (title) {
                            // stip  这里的标题不要更改, 在合同签署的时候
                            if (title === '已提交' || title === '合同签署') {
                                emitter.emit(EM_PC_ORDER_REFRESH)
                            }

                            // 当前会话, 收到对话已转接给
                            // stip 这里的标题不要更改, 在转接的时候
                            if (title.indexOf('对话已转接给') > -1) {
                                if (state.sessionType === 'chat') {
                                    emitter.emit(EM_PC_USER_REFRESH)
                                } else {
                                    emitter.emit(EM_PC_ORDER_REFRESH)
                                }
                            }
                        }
                    }
                }
            }
        },

        // IM 未读数量, 用于顶部的信息跳转
        ImUnreadNum({ state }, { num }) {
            state.unReadNum = num
        },

        // IM 提交发送
        ImEmit({ state }, emit) {
            state.emit = emit
        },

        // 添加数据到 store 中[最近的会话]
        ImRecent({ commit, state }, recent) {
            let origin = clone(state.recentList);
            // 不存在则追加
            map(recent, function (rc) {
                let contain = find(origin, { tid: get(rc, 'tid') });
                if (!contain) {
                    origin.push(rc);
                }
            });

            // 存在则更新
            state.recentList = map(origin, function (or) {
                let contain = find(recent, { tid: get(or, 'tid') });
                if (contain) {
                    return contain;
                }
                return or;
            });
        },

        // 切换已经存在的会话
        ImSession({ commit, state, dispatch }, obj) {
            state.tid = get(obj, 'tid');

            // find at recent
            let atItem = find(state.recentList, function (e) {
                return get(e, 'tid') === state.tid
            })

            let sessionId = get(atItem, 'session_id');
            if (sessionId) {
                dispatch('ImSetSession', atItem)
                // 设置为已读
                state.recentList = map(state.recentList, function (or) {
                    if (get(or, 'session_id') === sessionId) {
                        set(or, 'unread_num', 0);
                    }
                    return or;
                });
            } else {
                // 获取 SessionId 信息并且更新到回话中
                apiImClientSessionInfo({
                    tid: state.tid
                }).then(({ data, success, message }) => {
                    if (!success) {
                        pcToast(message, success);
                    }
                    dispatch('ImSetSession', data)
                    set(data, 'unread_num', 0);
                    // 消息数设置为已读
                    dispatch('ImRecent', [
                        data
                    ])
                })
            }
        },

        ImSetSession({ state }, session) {
            state.session = session;
            state.sessionId = get(session, 'session_id');

            let ext = get(session, 'opposite_info.ext');
            let type;
            if (ext) {
                let extObj = JSON.parse(ext);
                type = get(extObj, 'team_type', 'chat');
            } else {
                // 默认是 客服和用户的对话群
                type = 'chat';
            }
            state.sessionType = type;
        },
        ImSetCraft({ state }, { tid, text }) {
            let craft = state.imCraft ? clone(state.imCraft) : {};
            set(craft, tid, text);
            state.imCraft = craft;
            // save session
            appSessionStore(storageKey.PC_CRAFT, state.imCraft);
        },
        ImUnsetCraft({ state }, { tid }) {
            let craft = state.imCraft ? clone(state.imCraft) : {};
            set(craft, tid, '');
            state.imCraft = craft;
            // save session
            appSessionStore(storageKey.PC_CRAFT, state.imCraft);
        },
        ImCraftInit({ state }, { craft }) {
            state.imCraft = craft;
        }
    },
    getters: {
        recent(state) {
            return sortBy(state.recentList, function (sess) {
                // 置顶排序加入 和 时间戳长度一致的权重
                let sticky = 0;
                if (get(sess, 'is_sticky')) {
                    sticky = 1000000000;
                }
                return -get(sess, 'last_msg.timestamp') - sticky;
            })
        }
    }
}

export default pc
