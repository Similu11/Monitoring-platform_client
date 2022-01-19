import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import index from '../pages/index.vue';
// const chartDemo = () => import('../components/myChart.vue');
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: index,
        children: []
    },
    {
        path: '/homer',
        component: () => import('../pages/homer.vue'),
        children: []
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;