
<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup lang="ts" >

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layout = computed(() => {
    const layout = route?.meta?.layout;

    if (layout) {
        return layout;
    }
    return 'div';
});



</script>
