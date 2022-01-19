<template>
    <DemoChild ref="compa" />
    <button @click="change">点击</button>
</template>
<script setup lang="ts">
import { ref, Ref,provide, onMounted } from 'vue';
// import DemoChild from '@/components/child.vue';
import DemoChild from '@/components/child2.vue';
/*const themeRef = ref('dark');
  provide('test', themeRef); //将子组件导出的属性，截取
    setTimeout(()=>{
    themeRef.value = 'xxx';
    },1000)*/

const compa = ref(null);
function change(){
    (compa.value as any).changeNum();
}


</script>
<style scoped>
</style>
