<template>
{{num}}
</template>
<script setup  lang="ts">
/*
子向父传递方法的两种方式：
2.子组件
defineExpose()抛出方法 
父组间 定义ref 属性，
const compa = ref(null); 获取html，但是要在onMounted声明周期后，才能获取的到
 (compa.value as any).changeNum();强转类型后调用
*/
    import { ref, inject, defineExpose} from 'vue';
    const num = ref(0);
    function changeNum(){
        num.value = Math.random();
    }

    defineExpose({
        changeNum
    })
</script>
<style scoped>
</style>
