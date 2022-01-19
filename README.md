# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
/*
在编写ts过程中，如果变量的类型是可知的，完全没有必要去先定义interface，定义类型后，在去实现，直接：
 type TState =  typeof  xx; 就可以拿到
 除非是，变量的类型预先不可知，是通过异步函数返回的，或者接口请求的，才需要定义interface 
*/