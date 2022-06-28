<template>
    <div>
        <div class="div-back" @click="onBack"><img src="@/assets/imgsCom/ic_msg_back.png"> 撤回</div>
    </div>
</template>

<script lang="ts" setup>

/**
 * 已读未读标识
 */
import { emitter } from '@popjs/core/bus/mitt';
import { EM_PC_CALL_MESSAGE } from "@/utils/socket";

const props = defineProps({
    type: String,
    msg_id: String
})
const onBack = function () {
    emitter.emit(EM_PC_CALL_MESSAGE, props.msg_id)
}

</script>

<style scoped lang="less">


.div-back {
    width: 49px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 12px;
    color: var(--k-color-white);
    background-color: rgba(0, 0, 0, 0.28);

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    img {
        width: 10px;
        height: 10px;
        margin-right: 2px;
        margin-bottom: 3px
    }
}


</style>
