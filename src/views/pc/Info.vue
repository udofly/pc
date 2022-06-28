<template>
    <div class="login">
        <a-row>
            <a-col :span="12" :offset="6">
                <div class="login-ctr">
                    <div class="logo">
                        <img :src="themeAssets('logo')" :alt="appTitle">
                        <p>用户信息</p>
                    </div>
                    <el-form label-width="100px">
                        <el-form-item label="通行证">
                            {{ info.id }}
                        </el-form-item>
                        <el-form-item label="用户名">
                            {{ info.username }}
                        </el-form-item>
                        <el-form-item label="注册时间">
                            {{ info.created_at }}
                        </el-form-item>
                        <el-button class="px--block" @click="onLogout">退出登录</el-button>
                    </el-form>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { apiPySystemAuthAccess, apiPySystemAuthLogout } from '@/services/poppy';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { pcToast } from '@/utils/pc';
import usePcUserUtil from '@/composables/usePcUserUtil';
import { themeAssets } from "@/utils/utils";
import { appTitle } from "@/utils/conf";

const info = ref({
    id: '',
    created_at: '',
    username: ''
});
const store = useStore();
const router = useRouter();
const { userLogout } = usePcUserUtil();
const req = () => {
    apiPySystemAuthAccess({}, 'pc').then(({ success, data, message }) => {
        pcToast(message, success)
        if (success) {
            info.value = data
        }
    })
}
onMounted(req);

const onLogout = function () {
    apiPySystemAuthLogout('pc')
        .then(({ success, message }) => {
            pcToast(message, success)
            if (success) {
                userLogout();
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
    > div, > form {
        width: 100%;
    }
}

.login {
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
}

</style>
