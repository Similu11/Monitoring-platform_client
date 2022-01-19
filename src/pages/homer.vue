<template>
    <a-drawer
        :width="320"
        title="模块设置"
        placement="right"
        :closable="false"
        v-model:visible="visible"
    >
        <a-space direction="vertical">
            <a-select v-model:value="mod" style="width: 280px" placeholder="请选择模块">
                <a-select-option
                    v-for="item in modeArr.result"
                    :key="item.key"
                    :value="item.value"
                >{{ item.value }}</a-select-option>
            </a-select>
            <a-button type="primary" @click="closeDrawer" class="btn_right">确定</a-button>
        </a-space>
    </a-drawer>
    <a-layout class="homer_layout">
        <a-layout-sider class="homer_left">
            <img class="logo" src="../assets/logo/1.png" />
            <a-menu
                id="dddddd"
                v-model:selectedKeys="selectedKeys"
                style="width: 200px"
                mode="inline"
                class="homer_menu"
                @click="handleClick"
            >
                <a-menu-item key="performancecollection">性能收集</a-menu-item>
                <a-menu-item key="errorbacktrack">错误回溯</a-menu-item>
                <a-menu-item key="sourcemapanalysis">sourceMap解析</a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content
                class="right_content"
                style="width:100%;height:100%;overflow-y: scroll;overflow-x: none;"
            >
                <component :is="currenttabcomponent"></component>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script  lang="ts">
import { ref, onMounted, reactive, toRefs, provide,getCurrentInstance } from 'vue';
import performancecollection from '@/pages/PerformanceCollection.vue';
import errorbacktrack from '@/pages/ErrorBacktrack.vue';
import sourcemapanalysis from '@/pages/sourceMapAnalysis.vue';
export default {
    components: {
        performancecollection,
        errorbacktrack,
        sourcemapanalysis
    },
    setup() {
        const { proxy } = getCurrentInstance() as any;
        let visible = ref<boolean>(false);
        let mod = ref<string>('');
        let selectedKeys = ref<string>('');
        let currenttabcomponent = ref<string>('');
        function closeDrawer(params: string) {
            fetch('http://localhost:8852/reloadModelVsrsion',{method: 'post',body:mod.value}).then(res => res.json()).then(data => {
                if(data.status == 200){
                     visible.value = false;
                     proxy.$message.success(data.msg);
                }else{
                    proxy.$message.error(data.msg);
                }
            })
        }
        provide('model', mod);
        function handleClick(e: Event) {
            currenttabcomponent.value = e.key;
        }
        let modeArr = reactive({
            result: []
        });
        onMounted(() => {//dom首次渲染完成之后，才能获取到真实的dom
            fetch('http://localhost:8852/modelVsrsion').then(res => res.json()).then(data => {
                // visible.value = true;
                modeArr.result = data.result;
                toRefs(modeArr);
            })
        });
        return {
            visible,
            mod,
            selectedKeys,
            currenttabcomponent,
            handleClick,
            closeDrawer,
            modeArr
        }
    }
}

</script>
<style>
</style>
