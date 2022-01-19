<template>
  <h1>{{ msg }}</h1>
  {{ ov }}
  {{ name }}
</template>
<script setup lang="ts">
import { reactive, ref, defineProps, toRefs } from 'vue';
//reactive 复杂的数据类型   
//ref 单个的简单的元素，简单数据类型
 type Dstate = {
      name: string;
      address: string;
    }
defineProps({
  msg: String
})
const ov = ref(0);
//使用reactive包裹单个ref声明的变量
const state = reactive({
  ov
});
const obj:Dstate = reactive({
  name: 'wc',
  address: '北京'
});
let {name} = { ...toRefs(obj) };
name.value = 'zzzzz';
//正常解构过后，数据会变成非响应的,toRefs函数，它可以将reactive返回的对象中的属性都转成ref
</script>
<style scoped>
</style>
