<template></template>
<script setup lang="ts">
/*
 watcheffct特性：
 1.不需要手动传入依赖
 2.每次初始化时，都会执行一次，分析依赖
 3.无法获取原始值，只能获取变化之后的值
 4.一些异步操作，放在里面更加合适
 5.watch的第三个参数是处理副作用的，现在作为第一个参数使用
*/ 
import { ref, reactive, watch,watchEffect,onMounted} from 'vue';

const num  = ref(0);
onMounted(()=>{
    console.log('xx');
});
const stop =  watchEffect((onInvalidate)=>{ 

    console.log('watchEffect可以在unMount之前调用一次',num.value);
    onInvalidate(()=>{
        //onInvalidate可用于删除某些dom元素所绑定的事件,删除元素。。。主要是为了处理watchEffect的副作用
      
    })
},{ 
    //flush:"pre" | "post" | "sync" | undefined,//当前的调用时机
    onTrigger(e){
        //debugger; //用于调试
    }
})
setTimeout(()=>{
    num.value++;
},1000);
//stop(); //可以停用监听
</script>
<style scoped>
</style>
