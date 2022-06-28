<template>
    <div class="phase">
        <a-select
            v-model:value="trans.def_msg"
            :dropdown-match-select-width="false">
            <a-select-option
                @click="onItemClickMsg(item)"
                v-for="item in trans.list_msg"
                :key="item.id"
                :value="item.title">
                {{ item.title }}
            </a-select-option>
        </a-select>

        <el-scrollbar class="phase-content">
            <template v-for="item in phases" :key="item.id" :mouse-leave-delay="0">
                <a-tooltip :title="get(item, 'content')" color="var(--pc-color-theme)" placement="bottomRight" :mouse-leave-delay="0">
                    <p @click.exact="onTrans(get(item, 'content'))">
                        {{ get(item, 'remarks') ? get(item, 'remarks') : get(item, 'content') }}
                    </p>
                </a-tooltip>
            </template>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { find, get } from 'lodash-es';
import { useStore } from '@/store';
import { apiPcUserShortcutPhrase } from '@/services/pc';
import { pcToast } from '@/utils/pc';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { emitter } from '@popjs/core/bus/mitt';
import { EM_PC_CHAT_INPUT, EM_PC_REFRESH_SHORT_MSG } from "@/utils/socket";

const props = defineProps({
    type: {
        type: String,
        default: 'user'
    }
})

const phases = ref([]);
const store = useStore();

const trans = reactive({
    uid: computed(() => store.state.pc.imAccid),
    tid: computed(() => store.state.pc.tid),
    msg_type: props.type,
    group_id: '',
    def_msg: '快捷短语',
    list_msg: [],
    type: computed(() => store.state.pc.sessionType)

})

defineComponent({
    QuestionCircleOutlined
})

// 事件触发
const onTrans = function (message: string) {
    emitter.emit(EM_PC_CHAT_INPUT, message)
}

// 收到刷新短语
emitter.on(EM_PC_REFRESH_SHORT_MSG, function (type) {
    trans.msg_type = type + '';
    trans.group_id = '';
    fetchList();
})

const offBus = () => {
    emitter.off(EM_PC_REFRESH_SHORT_MSG)
}

onUnmounted(offBus)

// 点击快捷短语 类型
const onItemClickMsg = function (message: Object) {
    trans.group_id = message.id;
    fetchList();
}
// 监听订单类型
watch(() => trans.type, (newVal) => {
    trans.msg_type = newVal
    fetchList()
})

const fetchList = async () => {
    let type = '';
    if (trans.msg_type === 'chat' || trans.msg_type === 'user') {
        type = 'user'
    } else {
        type = 'order'
    }
    let params = { type: type, group_id: trans.group_id };
    apiPcUserShortcutPhrase(params).then(({ success, data, message }) => {
        if (success) {
            phases.value = data.list;
            trans.list_msg = data.group;
            let def = find(data.group, (item) => {
                return item.is_default === 'Y'
            })
            if (!def) {
                def = data.group[0]
            }
            //todo
            trans.def_msg = def.title;
            trans.group_id = def.id;

        } else {
            pcToast(message, success);
        }
    });
};

onMounted(fetchList);

</script>
<style lang="less">

.phase {


    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
        position: relative;
        border: 0;
        border-radius: 0;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        background: var(--pc-color-bg-main);
        color: var(--pc-color-text-black);
        height: 44px;
        width: 224px;
        line-height: 44px;
        text-align: center;
        padding-top: 7px;
        font-weight: bold;

    }

    .ant-select-arrow {
        display: none;
    }

    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: transparent;
        border-right-width: 0 !important;
        box-shadow: none;
    }
    .ant-select-selection-item {
        &::after {
            content: ' ▾' !important;
            width: 5px !important;
            margin-left: 10px;
            visibility: inherit !important;
        }
    }

    .ant-select-single.ant-select-open .ant-select-selection-item {
        background-color: transparent;
        color: var(--pc-color-text-black);
    }

    .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
        padding-right: 0;
    }


    //下拉的边框
    .ant-select-dropdown {
        padding: 0 0 0 0;
    }

    //下拉的 每一条item
    .ant-select-item-option {
        border-bottom: 1px solid var(--pc-color-bg-main);
        height: 32px;
        text-align: center;
    }

    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
        background-color: transparent;
        color: var(--pc-color-theme);
    }
}

</style>

<style scoped lang="less">


.phase-content {
    height: calc(100vh - 44px);
    padding: 1px;
    p {
        cursor: pointer;
        height: 42px;
        overflow: hidden;
        line-height: 42px;
        padding: 0 4px;
        margin: 0;
        &:hover {
            color:  var(--k-color-white);;
            background: var(--pc-color-theme) !important;
        }
        border-radius: 4px;
        &:nth-child(2n) {
            background: var(--pc-color-bg-main);
        }
    }
}

.phase {
    overflow-y: auto;
}

.text-ellipsis {
    display: block;
    max-width: 160px;
}

</style>
