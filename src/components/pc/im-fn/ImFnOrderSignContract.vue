<template>
    <el-button size="small" @click="isVisible=true" class="btn" v-if="visible">
        签署合同
    </el-button>
    <a-modal cancel-text="取消" ok-text="确定"
        v-model:visible="isVisible" @ok="onConfirm"
        title="邀请签署合同">
        <a-form :model="value" ref="formRef" :rules="rules" layout="vertical">
            <a-form-item label="合同送达地址" name="can_take_address">
                <a-input v-model:value="value.can_take_address"/>
            </a-form-item>
            <a-form-item label="换绑时间" name="change_bind_hours">
                <a-select v-model:value="value.change_bind_hours" placeholder="请选择绑定时间">
                    <a-select-option v-for="i in trans.autoOver" :key="i" :value="i">{{ i }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择签署模板" name="contract_template_id">
                <a-radio-group v-model:value="value.contract_template_id">
                    <a-list :data-source="tpl" class="side">
                        <template #renderItem="{ item }">
                            <a-radio :value="get(item, 'id')">
                                {{ get(item, 'note') }}
                                [{{ get(item, 'sign_type') }}]
                                <a :href="get(item, 'doc_url')" target="_blank">
                                    <LinkOutlined/>
                                </a>
                            </a-radio>
                        </template>
                    </a-list>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue';
import { LinkOutlined } from '@ant-design/icons-vue';
import { get } from 'lodash-es';
import { apiMiscChatContractTemplate, apiMiscChatInviteSignContract } from '@/services/pc';
import { useStore } from '@/store';
import { pcToast } from '@/utils/pc';

const props = defineProps({
    orderId: Number,
    visible: Boolean
})


defineComponent({
    LinkOutlined
})
const store = useStore();
const trans = reactive({
    autoOver: computed(() => get(store.state.poppy, 'core.account.auto_over_hour'))
});
const isVisible = ref(false);
const tpl = ref([]);

const formRef = ref();
const rules = {
    can_take_address: [{ required: true, message: '请填写合同送达地址' }],
    contract_template_id: [{ required: true, message: '请选择模板' }],
    change_bind_hours: [{ required: true, message: '绑定时间' }]
}

const value = reactive({
    can_take_address: '',
    contract_template_id: 0,
    change_bind_hours: 0
});

watch(() => isVisible.value, (newValue) => {
    if (newValue) {
        value.can_take_address = '';
        value.change_bind_hours = 0;
        value.contract_template_id = 0;
        formRef.value.resetFields();
    }
})

const fetchTpl = function () {
    apiMiscChatContractTemplate({}).then(({ success, message, data }) => {
        if (success) {
            tpl.value = get(data, 'list', []);
        } else {
            pcToast(message, success);
        }
    })
}

const onConfirm = function () {
    formRef.value.validate().then(() => {
        apiMiscChatInviteSignContract({
            ...value,
            order_id: props.orderId
        }).then(({ success, message }) => {
            pcToast(message, success);
            if (success) {
                isVisible.value = false;
            }
        })
    })
}

onMounted(fetchTpl)
</script>
<style scoped lang="less">

.btn {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}
</style>
