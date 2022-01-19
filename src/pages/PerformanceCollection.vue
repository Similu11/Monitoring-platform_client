<template class='performance_body'>
  <a-layout>
    <a-layout-header class="performance_head">
      <div class="performance_header_child_div">
        <exclamation-circle-two-tone style="font-size:2rem;" two-tone-color="#52c41a" />pv
      </div>
      <div class="performance_header_child_div">pv</div>
      <div class="performance_header_child_div">uv</div>
      <div class="performance_header_child_div">ftp</div>
      <div class="performance_header_child_div,performance_header_child_div_last">ffp</div>
    </a-layout-header>
    <a-layout-content class="performance_content">
      <div id="chart"></div>
    </a-layout-content>
    <div class="performance_time">
      <a-config-provider :locale="locale">
        时间:
        <a-date-picker
          v-model:value="time"
          :showToday="false"
          placeholder="请选择日期"
          class="performance_date_picker"
        />
      </a-config-provider>
    </div>
    <a-layout-footer class="performance_footer">
      <div class="performance_footer_top">
        <a-button type="default" size="Default">
          导出
          <template #icon>
            <DownloadOutlined />
          </template>
        </a-button>
      </div>
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
            <a-button v-for="tag in record.tags" type="default" size="Default">{{tag}}</a-button>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="default" size="Default" >查看日志</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-footer>
  </a-layout>
</template>
<script  lang="ts">
import { inject, onMounted, defineComponent, nextTick, getCurrentInstance } from 'vue';
import { ExclamationCircleTwoTone } from '@ant-design/icons-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
  components: {
    ExclamationCircleTwoTone,
    DownloadOutlined
  },
  setup() {
    const theme = inject('model');
    const { proxy } = getCurrentInstance() as any;
    let time = ref<undefined>(undefined);
    const locale = ref(zhCN.locale);
    let dataSource = ref([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }
    ]);
    const columns = ref([{
      title: 'Name',
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    }, {
      title: 'Action',
      key: 'action',
    }]);
    onMounted(() => {
      let option = {
        tooltip: {
          // trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider',
            moveHandleIcon: "none",
            moveHandleSize: 0,
            top: "95%",
            bottom: "0%",
            left: "5%",
            selectedDataBackground: {
              lineStyle: {
                // color: "rgba(233, 237, 231, 1)"
              },
              areaStyle: {
                color: "rgba(249, 235, 235, 1)"
              }
            }
            // handleIcon:'image://../assets/logo/logo.jpeg'
          }
        ],
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          top: '5%',
          left: '3%'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 2580, 1330, 1320, 820, 932, 901, 934, 2580, 1330, 1320],
            barWidth: 10,
            type: 'bar',
            large: true
          },
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      nextTick(() => {
        const chartDom = <HTMLElement>document.getElementById('chart');
        const myChart = proxy.$echarts.init(chartDom);
        myChart.setOption(option);
        window.onresize = function () {
          myChart.resize();
        }
      });
    });
    return {
      theme,
      time,
      locale,
      dataSource,
      columns
    }
  }
})
</script>
<style>
</style>
