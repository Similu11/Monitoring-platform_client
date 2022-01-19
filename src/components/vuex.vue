<template></template>
<script setup lang="ts">
//代码的书写都要在setup 内
import { ref, reactive } from 'vue';
import { useWcStore } from '../hooks/use-store';
const state = reactive({ count: 0 });
const { state: wcState, getters } = useWcStore();
console.log('vuex数据', wcState.user.loading); // 17   03:00
console.log('getters', getters['user/isLogin']); //这里
</script>
<style scoped>
</style>
