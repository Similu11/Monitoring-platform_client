<template></template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
const state = reactive({ count: 0 });
watch(() => state.count, (count, prevCount) => {
    console.log('检测的值：', count, prevCount);
}, {
    immediate: true, //初始化后执行一次，默认是不执行的，只有当检测的值发生变化，才会执行
    deep: true //当监听的数据层级较深时，使用该属性，深层递归拷贝
});
setTimeout(() => {
    state.count++;
}, 1000);

//当变量是通过ref声明的，则可以简写如下：
const num = ref(0);
watch([num],(num,old)=>{ //回调函数的第一个参数需和watch第一个参数名称相同

})
</script>
<style scoped>
</style>
