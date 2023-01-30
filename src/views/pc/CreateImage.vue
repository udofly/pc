<template>
    <div class="flex-row">
        <div class="left">
            <div class="form">
                <div class="logo">
                    <img src="/assets/theme/kejinshou/logo.png" :alt="appTitle">
                    <h4>图片生成</h4>
                    <p>输入图片要求的宽高</p>
                </div>
                <el-form :model="value" :rules="rules" :ref="(el)=> {form = el}" label-width="100px">
                    <el-form-item label="图片宽度" prop="passport">
                        <el-input v-model="value.width"></el-input>
                    </el-form-item>
                    <el-form-item label="图片高度" prop="password">
                        <el-input v-model="value.height"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="px--block" @click="onSubmit()">生成图片</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="right">
            <h4>{{ trans.imageUrl }}</h4>
            <img :src="trans.imageUrl"/>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { appTitle } from '@/utils/conf';
import { ElForm } from 'element-plus';

const form: any = ref<InstanceType<typeof ElForm>>();
const trans = reactive({
    imageUrl: '',
});
const value = reactive({
    width: '100',
    height: '100',
})
const rules = reactive({
    width: [
        { required: true, message: '请输入图片宽度', trigger: 'change' }
    ],
    height: [
        { required: true, message: '请输入图片高度', trigger: 'change' }
    ]
})
const router = useRouter();
const store = useStore();

const onSubmit = () => {
    form.value.validate((valid: boolean) => {
        if (valid) {

            trans.imageUrl = "https://qyd-testing.oss-cn-hangzhou.aliyuncs.com/_res/images/01.jpg?x-oss-process=image/resize,m_fixed,h_" + value.height + ',w_' + value.width;

        }
    })

}
</script>

<style scoped lang="less">


.left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: calc(100% - 400px);
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
