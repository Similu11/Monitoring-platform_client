<template>{{ plusOne }}</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
const count = ref(1);
count.value = 2; //可以赋值，所以经过computed计算并返回后，plusOne的value变为了只读属性
const plusOne = computed(() => count.value++);
//plusOne.value++; //无法分配到 "value" ，因为它是只读属性
const plusTwo = computed({
    get: () => count.value + 1,
    set: (val) => {
        count.value = val - 1;
    }
})
plusTwo.value = Math.random();
</script>
<style scoped>
</style>
