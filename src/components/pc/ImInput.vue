<template>
    <div class="content x--pc-input">
        <div class="content-header">
            <el-upload :action="`${imApiUrl}/client/upload/file`" name="file" :http-request="onUpload" class="header-image"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
            >
                <icon-font type="icon-image"/>
            </el-upload>
            <!--  仅仅聊天群显示拍一拍 -->
            <icon-font v-if="trans.type==='chat'" type="icon-pai" class="header-pai" @click="onPat"/>
        </div>
        <el-scrollbar class="content-input-wrapper ">
            <div :class="{'content-input': true,'input-wrapper': true, 'drag-in': trans.dragIn} " ref="refDiv" contenteditable="true"
                @dragover="trans.dragIn=true" @paste="onPaste" @input="onInput"
                @drop="onDrop"
                data-placeholder="输入聊天内容，Enter键发送消息…"
                @keydown.enter="onSend">
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useStore } from '@/store';
import { each, get } from 'lodash-es';
import { imMsgImage, imMsgText, pcToast } from '@/utils/pc';
import IconFont from '@/components/base/IconFont';
import { imApiUrl, storageKey } from '@/utils/conf';
import { apiImClientUploadFile, apiImClientVideoOSS } from '@/services/im';
import { appSessionStore, parseNodes } from '@/utils/utils';
import { emitter } from '@popjs/core/bus/mitt';
import { apiMiscChatSendPatMessage } from '@/services/pc';
import OSS from 'ali-oss';
import { UploadRawFile } from 'element-plus';
import { base64ToFile } from "@popjs/core/utils/helper";
import { EM_PC_CHAT_INPUT, EM_PC_VIDEO_SEND, EM_PC_VIDEO_SEND_FAILURE, EM_PC_VIDEO_SEND_SUCCESS } from "@/utils/socket";


const trans = reactive({
    uid: computed(() => store.state.pc.imAccid),
    tid: computed(() => store.state.pc.tid),
    type: '',
    craft: computed(() => store.state.pc.imCraft),
    dragIn: false,
    sessionId:computed(()=> store.state.pc.sessionId)
})
const refDiv: any = ref();
const store = useStore();

// 监听输入的变化, 自动填入
emitter.on(EM_PC_CHAT_INPUT, (message) => {
    refDiv.value.textContent = message;
    refDiv.value.focus();
    // save tid : text
    store.dispatch('pc/ImSetCraft', {
        tid: trans.tid,
        text: message
    })
})

// 监听订单类型
watch(() => store.state.pc.session, (newVal) => {
    let session = store.state.pc.session
    let ext = get(session, 'opposite_info.ext');
    if (ext) {
        let extObj = JSON.parse(ext);
        trans.type = get(extObj, 'team_type', 'chat');
    } else {
        // 默认是 客服和用户的对话群
        trans.type = 'chat';
    }
})
watch(() => trans.tid, (newVal) => {
    if (newVal) {
        refDiv.value.textContent = get(trans.craft, newVal);
    }
})


const onPaste = (e) => {
    console.log(e);
}

const onInput = () => {
    const { texts } = parseNodes(refDiv.value.childNodes);
    // 发送文字
    let textAll = '';
    each(texts, (item) => {
        textAll += item.textContent + '\n';
    })
    if (textAll) {
        // save tid : text
        store.dispatch('pc/ImSetCraft', {
            tid: trans.tid,
            text: textAll
        })
    }
}

const onDrop = (e) => {
    trans.dragIn = false;
    //取消事件传播及默认行为
    e.stopPropagation();
    e.preventDefault();

    //取得拖进来的文件
    let data = e.dataTransfer;
    let files = data.files;
    //将其传给真正的处理文件的函数
    each(files, (file) => {
        //创建FileReader
        let reader = new FileReader();
        //读取图片
        reader.readAsDataURL(file);
        //告诉它在准备好数据之后做什么
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            refDiv.value.appendChild(img);
            refDiv.value.focus();
        };
    })
}

const beforeAvatarUpload = (file: UploadRawFile) => {
    const isLt50M = file.size / 1024 / 1024 <= 50
    if (!isLt50M) {
        pcToast("文件大小不能超过 50M", false);
    }
    return isLt50M
}

const onUpload = ({ file }) => {

    if (file.type.indexOf('data:video') == 0 || file.type.indexOf('video') == 0){
        apiImClientVideoOSS("pc").then(({ success, message, data }) => {

            let  access_key_id = get(data,"access_key_id");
            let  access_key_secret = get(data,"access_key_secret");
            let  security_token = get(data,"security_token");
            let  bucket = get(data,"bucket");

            let  prefix_url = get(data,"prefix_url");
            let  directory = get(data,"directory");

            let  endpoint = get(data,"endpoint");
            let client = new OSS({
                accessKeyId: access_key_id,
                accessKeySecret: access_key_secret,
                stsToken: security_token,
                // 刷新临时访问凭证的时间间隔，单位为毫秒。
                // refreshSTSTokenInterval: 300000,
                // 填写Bucket名称。
                bucket: bucket,
                endpoint:endpoint
            });
            // object表示上传到OSS的文件名称。
            // file表示浏览器中需要上传的文件，支持HTML5 file和Blob类型。
            let path =   directory + file.name;

            let timestamp = parseInt(new Date().getTime()/1000);
            let action = {
                "operation": "sessionUpdate",
                "data": {
                    "session_id": trans.sessionId,
                    "tid": trans.tid,
                    "last_msg": {
                        "timestamp": timestamp,
                        "type": 0,
                        "body": "视频发送中"
                    },
                    "last_msg_time": timestamp,
                }
            };
            store.dispatch('pc/ImAction', action).then();
            let url =   prefix_url + '/'+ directory + file.name;
            let tipActioin = {
                "uid":trans.uid,
                "tid": trans.tid,
                "url":url,
            };
            emitter.emit(EM_PC_VIDEO_SEND,tipActioin)
            client.put(path, file).then(function (r1) {
                console.log('put success: %j', r1);
                emitter.emit(EM_PC_VIDEO_SEND_SUCCESS,tipActioin)
            }).then(function (r2) {
                console.log('get success: %j', r2);
            }).catch(function (err) {
                console.error('oss error: %j', err);
                emitter.emit(EM_PC_VIDEO_SEND_FAILURE,tipActioin)
            });

        }).catch(function (error){
            console.log("get token oss error:",error)
        });

    }else if(file.type.indexOf('data:image') == 0 || file.type.indexOf('image') == 0){

        apiImClientUploadFile({
            file: file
        }).then(({ message, success, data }) => {
            if (success) {
                store.dispatch('pc/ImEmit', {
                    action: 'chat',
                    message: imMsgImage(trans.uid, trans.tid, get(data, 'url'))
                })
            } else {
                pcToast(message, success);
            }
        })
    }else{
        // alert("文件格式错误")
    }
}

const onPat = () => {
    apiMiscChatSendPatMessage({
        im_tid: trans.tid
    }).then(({ message, success }) => {
        if (!success) {
            pcToast(message, success);
        }
    })
}

const onSend = function (e: Event) {
    const { imgs, texts } = parseNodes(refDiv.value.childNodes);
    // 发送图片
    each(imgs, (item) => {
        base64ToFile(item.src).then((file) => {
            onUpload({ file })
        })
    })

    // 发送文字
    let textAll = '';
    each(texts, (item) => {
        textAll += item.textContent + '\n';
    })
    if (textAll) {
        store.dispatch('pc/ImEmit', {
            action: 'chat',
            message: imMsgText(trans.uid, trans.tid, textAll)
        })
    }
    refDiv.value.textContent = '';
    e.preventDefault();

    store.dispatch('pc/ImUnsetCraft', {
        tid: trans.tid
    })
    return false;
}

onMounted(() => {
    // 这里获取数据并赋值
    let craft = appSessionStore(storageKey.PC_CRAFT);
    store.dispatch('pc/ImCraftInit', {
        craft
    })
})
onUnmounted(() => {
    emitter.off(EM_PC_CHAT_INPUT)
})

</script>

<style scoped lang="less">
.content {
    border-top: 1px solid var(--pc-color-bg-main);;
    height: 140px;
    margin: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: white;
    .van-button {
        margin-right: 15px;
    }
    .input {
        flex: auto;
    }
    .input-bg {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--pc-color-bg-main);
        border-radius: 15px;
        height: 44px;
        padding: 0 12px;
    }
    .input-box {
        background-color: var(--pc-color-bg-main);
        width: 100%;
    }
    .thumb-album {
        width: 22px;
        height: 22px;
    }
    .thumb-send {
        width: 44px;
        height: 44px;
    }
    .btn-send {
        font-size: 16px;
    }
}

.header-image {
    display: inline-block;
    margin-right: 0.8rem;
}

.content-input-wrapper {
    height: 100px
}

.content-input {
    border: 2px solid var(--k-color-white);
    &.drag-in {
        border: 2px dashed var(--pc-color-theme);
    }
    padding: 0 18px;
    min-height: 96px;
    &[data-placeholder]:empty::before {
        content: attr(data-placeholder);
        color: var(--pc-color-text-light);
    }
    &:hover {
        cursor: text;
    }
    &[data-placeholder]:empty:focus::before {
        content: "";
    }
    &:focus, &:focus-visible {
        border: none;
        outline: none;
        padding: 0 18px;
    }
}

.content-header {
    font-size: 22px;
    padding: 0 12px;
}

.header-pai {
    cursor: pointer;
}
</style>
