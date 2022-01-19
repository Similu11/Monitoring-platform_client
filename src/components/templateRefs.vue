<template>
    <input type="text" ref="root" value="ref使用例子" />
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
const root = ref(null); //ref(null)代表html

onMounted(() => {//dom首次渲染完成之后，才能获取到真实的dom
    console.log('file', root.value)
})
</script>
<style scoped>
</style>
