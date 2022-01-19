<template>
    <a-button type="primary">Primary Button</a-button>
    <a-cascader
        v-model:value="value"
        :options="options"
        :display-render="displayRender"
        expand-trigger="hover"
        placeholder="Please select"
    />
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
// import useMyTest from '@/models/myTest';
// const ll  = ref(0);
// const { myTest } = await useMyTest();
interface Option {
    value: string;
    label: string;
    children?: Option[];
}
const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const displayRender = ({ labels }: { labels: string[] }) => {
    return labels[labels.length - 1];
};
const value = ref<string[]>([]);
</script>
<style>
</style>