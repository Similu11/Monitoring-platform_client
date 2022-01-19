<script setup lang="ts">
//代码的书写都要在setup 内
import { ref } from 'vue';  //创建响应式的值引入ref就可以了
import css from '@/assets/index.css';
defineProps({
  msg: String
});
let count = ref(0);//创建响应式的变量
const color = '#ccc';
const font = {
  size:'3em'
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code class='text'>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

//postcss需要支持
<style scoped>
:root{  
  --varColor:red;
  --initfn:()=>{
    console.log('xx');
  }
}
a {
  color: var(--varColor);
}
.text{
  color: v-bind(color);
  font-size: v-bind("font.size");
}
</style>
