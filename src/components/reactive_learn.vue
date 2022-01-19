<template>
  <div>默认的count:{{ state.double }}</div>
  <button @click="increment">up</button>
</template>
<script setup lang="ts">
  import { reactive, computed } from 'vue';
  //reactive 声明响应式数据    computed 计算属性
    type Dstate = {
      count: number;
      double: number;
    }
    const state: Dstate = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    function increment() {
      state.count++;
    }
</script>
<style scoped>
</style>
