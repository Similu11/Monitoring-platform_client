import { createApp } from 'vue';
import { Button, message, Cascader, Input, Drawer, Select, Space, Layout, Menu,DatePicker,LocaleProvider,Table,Tabs,Modal,Row,Col,Upload,List} from 'ant-design-vue';
import store from './store';
import "ant-design-vue/dist/antd.css";
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
.use(DatePicker).use(LocaleProvider).use(Table).use(Tabs).use(Modal).use(Row).use(Col).use(Upload).use(List)
/*.use(store)*/.mount('#app');//use中的参数为plugin类型
app.config.globalProperties.$message = message;
app.config.globalProperties.$echarts = echarts;
/**
 * 虽然说我们写的是ts文件，但是还是被vite编译成了js，在浏览器请求ts文件的时候，文件response header里的Content-Type: application/javascript
 */