import { createApp } from 'vue';
import { Button, message, Cascader, Input, Drawer, Select, Space, Layout, Menu, DatePicker, LocaleProvider, Table, Tabs, Modal, Row, Col, Upload, List,Divider,Spin} from 'ant-design-vue';
// import store from './store';
import "ant-design-vue/dist/antd.css";
import 'rrweb-player/dist/style.css'; 
import './assets/index.css';
import App from './App.vue';
import router from './router';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import { DataZoomComponent } from 'echarts/components';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DatasetComponentOption,
    TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import collectInfo from 'monitoringsv_sdk';//rr-player
new collectInfo({
    resourceTiming: false,
    elementTiming: false,
    captureError: true,//是否开启错误跟踪
    isRrweb: false,//是否开启用户操作录制
    logUrl: 'http://localhost:8852/insertSourceMapLog',//上传错误文件sourcemap的地址
    rrwebUrl: 'http://localhost:8852/insertRrwebLog',//用户操作的视频上传地址
    permaceUrl: 'http://localhost:8852/uploadPermace',//界面性能的上传地址
    // maxTime: '',//最大测试时间
    module: 'vue-hjgh',//软件名称
});
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    DataZoomComponent,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);
message.config({
    duration: 1,
    maxCount: 1,
});
const app = createApp(App);
// app.config.productionTip = false;
app.use(router).use(Button).use(Cascader)
    .use(Input).use(Drawer).use(Select).use(Space).use(Layout).use(Menu)
    .use(DatePicker).use(LocaleProvider).use(Table).use(Tabs).use(Modal).use(Row).use(Col).use(Upload).use(List).use(Divider).use(Spin)
/*.use(store)*/.mount('#app');//use中的参数为plugin类型
app.config.globalProperties.$message = message;
app.config.globalProperties.$echarts = echarts;
/**
 * 虽然说我们写的是ts文件，但是还是被vite编译成了js，在浏览器请求ts文件的时候，文件response header里的Content-Type: application/javascript
 */