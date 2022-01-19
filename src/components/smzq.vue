<template></template>
<script setup lang="ts">
/*
 vue3的生命周期
 onBeforeMount        挂载之前
 onMounted            挂载之后  
 onBeforeUpdate       更新之前
 onUpdated            更新之后
 onBeforeUnmount      卸载之前
 onUnmounted          卸载之后
 onErrorCaptured      异常的捕获

 vue2与vue3的对比：
 beforeCreate  ---> use setup()
 created    -----> use setup()
 beforeMount   ----> onBeforeMount()
 mounted     ------>  onMounted()
 beforeUpdate    ------> onBeforeUpdate()
 update      --------->  onUpdated()
 beforeDestroy    ------> onBeforeUnmount()
 destoryed       ------->  onUnmounted()
 errorCaptured    -------> onErrorCaptured()
 
 vue3把生命周期抽离出整体的，放在一个单独的hooks，供全局使用
*/ 
import { ref, reactive,onMounted,onBeforeMount,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured} from 'vue';

onBeforeMount(()=>{
    console.log('onBeforeMount');
})
onMounted(()=>{
    console.log('onMounted');
})
onBeforeUpdate(()=>{
    console.log('onBeforeUpdate');
})
onUpdated(()=>{
    console.log('onUpdated');
})
onBeforeUnmount(()=>{
    console.log('onBeforeUnmount');
})
onUnmounted(()=>{
    console.log('onUnmounted');
})

</script>
<style scoped>
</style>
