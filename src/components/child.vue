<template>
{{theme}}
</template>
<script  lang="ts">
/*
子向父传递方法的两种方式：
1.子组件
inject 抛出 父组间 provide重载值即可
*/
    import { Ref, inject, defineComponent, watchEffect } from 'vue';
    export default defineComponent({
        name:'child',
        setup(){
            const theme = inject('test','wc');  
            watchEffect(()=>{
                console.log('主题被修改',(theme as unknown as Ref<string>).value); //将theme类型强转，但是必须先转换成unknown之后才能转换成Ref<string>
            });
            return {
                theme
            }
        }
    })
</script>
<style scoped>
</style>
