<template>
    <el-dialog :title="title" v-model="show" @close="onClose" custom-class="dialog">
        <el-empty description="未传入Url 地址, 无法预览" v-if="!url"></el-empty>
        <iframe :src="url" style="width: 100%;min-height: 60vh;border:none;" v-else></iframe>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
    title: String,
    visible: Boolean,
    url: String
})

const show = ref(false);
const emit = defineEmits([
    'update:visible'
])

watch(() => props.visible, (val) => {
    show.value = val
})

const onClose = () => {
    emit('update:visible', false)
}
</script>

<style scoped lang="less">

.dialog {
    height: calc(100vh - 200px);
    padding: 10px
}
</style>
