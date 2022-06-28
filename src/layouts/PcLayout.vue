<template>
    <div class="root">
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import usePcToken from '@/composables/usePcToken';
import useClearCache from '@/composables/useClearCache';
import useInit from '@/composables/useInit';

useInit();
useClearCache()
usePcToken();
</script>
<style scoped>
.root {
    width: 100%;
    height: 100vh;
    background: var(--k-color-white);
}
.container {
    margin: 0 auto;
    width: 1346px;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.20);
}
</style>
