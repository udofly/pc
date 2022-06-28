<template>
    <div class="x--pc-ic">
        <div class="time">{{ time }}</div>
        <div :class="{self:isSelf, other: !isSelf, content:true}">
            <div v-if="!isSelf">
                <img class="avatar-left" :src="avatar" :alt="nickname">
            </div>
            <ImMsgStatus v-if="isSelf" :type="content.is_recall" :msg_id="id"/>

            <div class="talk">
                <div class="nickname">{{ from.name }}</div>
                <div class="talk-body">
                    {{ body.title }}
                </div>
            </div>
            <div v-if="isSelf">
                <img class="avatar-right" :src="avatar" :alt="nickname">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import ImMsgStatus from '@/components/pc/im-msg/ImMsgStatus.vue';

const props = defineProps({
    id: String,
    from: Object,
    body: Object,
    content: Object,
    time: String
});

const store = useStore();
const nickname = get(props, 'from.name');
const avatar = get(props, 'from.icon');
const isSelf = computed(() => {
    return get(store.state.pc, 'imUser.uid') === get(props, 'from.uid')
});

</script>

<style scoped lang="less">

.tl-main {
    flex: 1;
    margin-left: 10px;
}
</style>
