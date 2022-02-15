<template>
    <div class="camera">
        <span class="lens"></span>
        <div class="picture">
            <div class="useMain">
                <a-input ref="userNameInput" v-model:value="userName" placeholder="input name">
                    <a-icon slot="prefix" type="user" />
                </a-input>
                <a-input-password v-model:value="password" placeholder="input password" />
                <a-button type="primary" @click="start">Login</a-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
let userName = ref<string>('');
let password = ref<string>('');
function start(this: any): void {
    router.push({path:'/homer'})
    // let a = {scriptURL:"http://127.0.0.1:5500/examples/sourcemap/dist/main.js",lineno:1,colno:84,message:"yideng is not defined",stack:"ReferenceError: i is not defined\n    at start (http://localhost:8080/src/pages/index.vue?t=1644153424124:9:19)\n    at callWithErrorHandling (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:6457:18)\n    at callWithAsyncErrorHandling (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:6465:17)\n    at emit (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:1621:5)\n    at http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:6275:45\n    at handleClick2 (http://localhost:8080/node_modules/.vite/ant-design-vue.js?v=1660b689:14584:7)\n    at callWithErrorHandling (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:6457:18)\n    at callWithAsyncErrorHandling (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:6465:17)\n    at HTMLButtonElement.invoker (http://localhost:8080/node_modules/.vite/chunk-MBGRQJRM.js?v=1660b689:7443:7)",module:"vue-hjgh"};
    // fetch('http://localhost:8852/insertSourceMapLog', { method: 'post', body:JSON.stringify(a) }).then(res => res.json()).then(data => {
    //     if (data.status == 200) {
            
            
    //     } else {
            
    //     }
    // })
}
</script>
<style>
</style>
