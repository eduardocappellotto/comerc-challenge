<template>
  <span :class="props.textClass">
    <slot></slot>
  </span>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  textClass: {
    type: String
  }
})
</script>
 