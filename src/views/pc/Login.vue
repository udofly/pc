<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <div class="login-ctr">
                <div class="form">
                    <div class="logo">
                        <img src="/assets/theme/kejinshou/logo.png" :alt="appTitle">
                        <h4>{{ appTitle }}</h4>
                        <p>您的一对一专属游戏助手</p>
                    </div>
                    <el-form :model="value" :rules="rules" :ref="(el)=> {form = el}" label-width="100px">
                        <el-form-item label="通行证" prop="passport">
                            <el-input v-model="value.passport"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="value.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="px--block" @click="onSubmit()">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { apiPySystemAuthLogin } from '@/services/poppy';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import { useRouter } from 'vue-router';
import { envLocalStore } from '@/utils/utils';
import { appTitle, storageKey } from '@/utils/conf';
import { ElForm } from 'element-plus';
import { pcToast } from '@/utils/pc';

const form: any = ref<InstanceType<typeof ElForm>>();
const trans = reactive({
    captchaDisabled: false,
    captchaText: '发送验证码'
});
const value = reactive({
    passport: '',
    password: '',
    captcha: ''
})
const rules = reactive({
    passport: [
        { required: true, message: '请输入通行证', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' }
    ]
})
const router = useRouter();
const store = useStore();

const onSubmit = () => {
    form.value.validate((valid: boolean) => {
        if (valid) {
            apiPySystemAuthLogin({
                passport: value.passport,
                password: value.password,
                guard: 'backend'
            }).then(({ success, message, data }) => {
                pcToast(message, success)
                if (success) {
                    envLocalStore(storageKey.PC_TOKEN, get(data, 'token'));
                    // set store
                    store.dispatch('pc/Login', {
                        token: get(data, 'token')
                    });
                    const go = get(router.currentRoute.value, 'query.go', '');
                    if (!go) {
                        router.push({ name: 'pc.info' })
                    } else {
                        router.push({ path: window.atob(go) })
                    }
                }
            })
        }
    })

}
</script>

<style scoped lang="less">


.login-ctr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.form {
    width: 100%;
}

.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 55px;
    img {
        width: 55px;
    }
    h4 {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: var(--k-color-text-black);
        text-align: center;
        margin: 0;
    }
    p {
        font-size: 12px;
        color: var(--k-color-text-light);
        text-align: center;
        margin-top: 0;
    }
}
</style>
