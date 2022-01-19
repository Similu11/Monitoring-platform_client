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
    router.push({path:'/homer'});
}
</script>
<style>
</style>
