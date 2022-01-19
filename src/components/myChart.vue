<template>
    <vue-highchart
        type="chart"
        :options="chartOptions"
        :oneToOneUpdate="true"
        :rendrawOnUpdate="true"
        :animateOnUpdate="true"
        @render="onRender"
        @updated="onUpdate"
        @destroy="onDestroy"
    ></vue-highchart>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
export default defineComponent({
    name: 'chartDemo',
    setup() {
        const installData = ref([43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]);
        const chartOptions = computed(() => ({
            title: {
                text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
            },
            subtitle: {
                text: '数据来源：thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: '就业人数'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                name: '安装，实施人员',
                data: installData.value
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }));
        const onRender = () => {
            console.log(111);
        }   

        const onUpdate = () => {

        }

        const onDestroy = () => {

        }
        return {
            chartOptions,
            onRender,
            onUpdate,
            onDestroy
        }
    }
})
</script>
<style scoped>
</style>
