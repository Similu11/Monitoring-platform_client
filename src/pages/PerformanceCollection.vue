<template class='performance_body'>
  <a-layout>
    <a-layout-header class="performance_head">
      <div class="performance_header_child_div">
        <exclamation-circle-two-tone
          style="font-size:1.5rem;margin: 1rem 0 0 -3rem;float:left;"
          two-tone-color="#52c41a"
        />
        <p class="performance_name">TTFB(首字节)</p>
        <p class="performance_value">
          {{ TTFBTotal }}&nbsp;
          <span class="performance_value_sp">ms</span>
        </p>
        <p class="performance_percentage">
          较昨日
          <arrow-down-outlined style="color:red;width:1.5rem;" />
          <span class="performance_value_per">1.42%</span>
        </p>
      </div>
      <div class="performance_header_child_div">
        <p class="performance_name">FCP</p>
        <p class="performance_value">
          {{ FCPTotal }}&nbsp;
          <span class="performance_value_sp">ms</span>
        </p>
        <p class="performance_percentage">
          较昨日
          <arrow-up-outlined style="color:green;width:1.5rem;" />
          <span class="performance_value_ser">1.67%</span>
        </p>
      </div>
      <div class="performance_header_child_div">
        <p class="performance_name">LCP</p>
        <p class="performance_value">
          {{ LCPTotal }}&nbsp;
          <span class="performance_value_sp">ms</span>
        </p>
        <p class="performance_percentage">
          较昨日
          <arrow-up-outlined style="color:green;width:1.5rem;" />
          <span class="performance_value_ser">4.89%</span>
        </p>
      </div>
      <div class="performance_header_child_div">
        <p class="performance_name">FID</p>
        <p class="performance_value">
          {{ FIDTotal }}&nbsp;
          <span class="performance_value_sp">ms</span>
        </p>
        <p class="performance_percentage">
          较昨日
          <arrow-up-outlined style="color:green;width:1.5rem;" />
          <span class="performance_value_ser">0.23%</span>
        </p>
      </div>
      <div class="performance_header_child_div performance_header_child_div_last">
        <p class="performance_name">TBT</p>
        <p class="performance_value">
          {{ TBTTotal }}&nbsp;
          <span class="performance_value_sp">ms</span>
        </p>
        <p class="performance_percentage">
          较昨日
          <arrow-up-outlined style="color:green;width:1.5rem;" />
          <span class="performance_value_ser">0.05%</span>
        </p>
      </div>
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
      <a-button type="primary" class="errorBack_date_search" @click="filterPermaceInfoByTime">
        <template #icon>
          <SearchOutlined />
        </template>
        查询
      </a-button>
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
      <a-table :dataSource="dataSource.result" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="default" size="Default" @click="openPermaceInfo(record)">查看日志</a-button>
            <a-button type="default" size="Default" @click="filterPermaceInfo(record)">设为筛选</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-footer>
    <a-modal v-model:visible="visible" title="日志详情" :maskClosable="false" class="Permace_modal">
      <a-row>
        <a-col :span="16" class="Permace_modal_left_col">
          <a-row class="Permace_modal_left_col_row">
            摘要信息
            <a-divider class="Permace_dashed" dashed />
            <div class="Permace_modal_left_col_row_div">生成时间&nbsp;&nbsp;{{ permace_time }}</div>
            <div class="Permace_modal_left_col_row_div">上报时间&nbsp;&nbsp;{{ permace_time }}</div>
            <div class="Permace_modal_left_col_row_div">
              URL&nbsp;&nbsp;
              <span class="modal_span_url">http://localhost:8852/insetModePermace</span>
            </div>
          </a-row>
          <a-row class="Permace_modal_left_col_row">
            页面性能指数
            <a-divider class="Permace_dashed" dashed />
            <div
              class="Permace_modal_left_col_row_div"
            >{{ permace_name }}:&nbsp;&nbsp; {{ permace_value }}ms</div>
          </a-row>
          <a-row class="Permace_modal_left_col_row" v-show="loadInfo">
            页面资源加载网络分析
            <a-divider class="Permace_dashed" dashed />
            <div class="Permace_modal_left_col_row_div">DNS查询: {{ loadInfoData.dnsLookupTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">TCP连接: {{ loadInfoData.tcpTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">请求响应: {{ loadInfoData.timeToFirstByte }}ms</div>
            <div class="Permace_modal_left_col_row_div">白屏时间: {{ loadInfoData.whiteTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">页面解析dom耗时: {{ loadInfoData.parseDomTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">dom渲染完成时间: {{ loadInfoData.domTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">页面onload时间: {{ loadInfoData.loadTime }}ms</div>
            <div class="Permace_modal_left_col_row_div">HTTP头大小: {{ loadInfoData.headerSize }} B</div>
            <div class="Permace_modal_left_col_row_div">请求总耗时: {{ loadInfoData.totalTime }}ms</div>
          </a-row>
        </a-col>
        <a-col :span="7" class="Permace_modal_right_col">
          <a-row class="Permace_modal_left_col_row">
            设备信息
            <a-divider class="Permace_dashed" dashed />
            <div
              class="Permace_modal_left_col_row_div"
            >内存大小:&nbsp;&nbsp; {{ navigatorInformation.deviceMemory }}GIB</div>
            <div
              class="Permace_modal_left_col_row_div"
            >核心数量:&nbsp;&nbsp; {{ navigatorInformation.hardwareConcurrency }}</div>
          </a-row>
          <a-row class="Permace_modal_left_col_row">
            网络位置
            <a-divider class="Permace_dashed" dashed />
            <div
              class="Permace_modal_left_col_row_div"
            >网络类型:&nbsp;&nbsp; {{ networkInformationVal.effectiveType }}</div>
            <div
              class="Permace_modal_left_col_row_div"
            >有效带宽:&nbsp;&nbsp; {{ networkInformationVal.downlink }}M</div>
            <div
              class="Permace_modal_left_col_row_div"
            >信号延迟:&nbsp;&nbsp; {{ networkInformationVal.rtt }}</div>
          </a-row>
        </a-col>
      </a-row>
      <template #footer>
        <a-button class type="primary" @click="closeModal">确定</a-button>
      </template>
    </a-modal>
  </a-layout>
</template>
<script  lang="ts">
import { inject, onMounted, defineComponent, nextTick, getCurrentInstance, toRefs } from 'vue';
import { ExclamationCircleTwoTone } from '@ant-design/icons-vue';
import { DownloadOutlined, ArrowDownOutlined, ArrowUpOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
  components: {
    ExclamationCircleTwoTone,
    DownloadOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    SearchOutlined
  },
  setup() {
    const theme = inject('model');
    let spinTag = inject('spinTag');
    let permace_time = ref<string>('');
    const { proxy } = getCurrentInstance() as any;
    let time = ref<undefined>(undefined);
    const networkInformationVal = ref<object>({});//网络类型
    const navigatorInformation = ref<object>({ deviceMemory: "", hardwareConcurrency: "" });//设备类型
    const locale = ref(zhCN.locale);
    let visible = ref<boolean>(false);
    let loadInfo = ref<boolean>(false);
    let loadInfoData = ref<object>({});
    let dataTotal = {
      navigationTiming: [],
      fcp: [], lcp: [], fid: [], tbt: [], networkInformation: []
    };
    let TTFBTotal = ref<string>('');
    let FCPTotal = ref<string>('');
    let LCPTotal = ref<string>('');
    let FIDTotal = ref<string>('');
    let TBTTotal = ref<string>('');
    let permace_name = ref<string>('');
    let permace_value = ref<string>('');
    let dataSource = reactive<object>({
      result: []
    });
    const columns = ref([{
      title: '指标名称',
      name: 'metricName',
      dataIndex: 'metricName',
      key: 'metricName',
      align: 'center'
    }, {
      title: '指标数值(ms)',
      dataIndex: 'dataVal',
      key: 'dataVal',
      align: 'center'
    }, {
      title: '项目名称',
      dataIndex: 'module',
      key: 'module',
      align: 'center'
    }, {
      title: '日期',
      key: 'time',
      dataIndex: 'time',
      align: 'center'
    }, {
      title: '操作',
      key: 'action',
      align: 'center'
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
          data: ['TTFB', 'FCP', 'LCP', 'FID', 'TBT', 'AAS'],
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
          axisTick: {
            show: false
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
              color: '#2d8cf0',
            }
          },
          axisLabel: {
            color: "black",
            fontWeight: 'normal',
            formatter: `{value} ms`
          }
        },
        series: [
          {
            data: [],
            barWidth: 10,
            type: 'bar',
            large: true
          },
          {
            name: 'TTFB',
            type: 'line',
            stack: 'TTFB',
            data: []
          },
          {
            name: 'FCP',
            type: 'line',
            stack: 'FCP',
            data: []
          },
          {
            name: 'LCP',
            type: 'line',
            stack: 'LCP',
            data: []
          },
          {
            name: 'FID',
            type: 'line',
            stack: 'FID',
            data: []
          },
          {
            name: 'TBT',
            type: 'line',
            stack: 'TBT',
            data: []
          }
        ]
      };
      const chartDom = <HTMLElement>document.getElementById('chart');
      const myChart = proxy.$echarts.init(chartDom);
      window.onresize = function () {
        myChart.resize();
      };
      fetch('/api/getPermaceByName', { method: 'post', body: JSON.stringify({ model: theme._value, name: ['navigationTiming', 'fcp', 'lcp', 'fid', 'tbt', 'networkInformation'] }) }).then(res => res.json()).then(data => {
        if (data.status == 200) {
          spinTag.value = false;
          dataTotal = data.result;
          dataSource.result = getTableItem(dataTotal, '');//toRefs
          networkInformationVal.value = dataTotal['networkInformation'][0].data;
          toRefs(dataSource);
          TTFBTotal.value = dataTotal.navigationTiming[0].data.timeToFirstByte;
          FCPTotal.value = dataTotal.fcp[0].data;
          LCPTotal.value = dataTotal.lcp[0].data;
          FIDTotal.value = dataTotal.fid[0].data;
          TBTTotal.value = dataTotal.tbt[0].data;
          option.series[1].data = renderItem(dataTotal.navigationTiming);
          option.series[2].data = renderItem(dataTotal.fcp);
          option.series[3].data = renderItem(dataTotal.lcp);
          option.series[4].data = renderItem(dataTotal.fid);
          option.series[5].data = renderItem(dataTotal.tbt);
          myChart.setOption(option);
        } else {
          proxy.$message.error('日志信息获取异常');
        }
      })
    });
    function renderItem(itemArr: Array<object>) {
      let arr = new Array();
      itemArr.forEach(item => {
        if (typeof (item.data) == 'number') {
          arr.push(item.data);
        } else {
          arr.push(item.data.fetchTime);
        }
      })
      return arr;
    }

    function getTableItem(itemArr: any, falg: string) {
      let tableData: any[] = [];
      if (falg == '') {
        let keys = Object.keys(itemArr);
        for (let s = 0; s < 20; s++) {
          for (let v = 0; v < keys.length; v++) {
            if (keys[v] == 'networkInformation') {
              continue;
            }
            let obj: any = {};
            let val = itemArr[keys[v]][s];
            if (val) {
              obj['metricName'] = val['metricName'] == 'navigationTiming' ? 'TTFB' : val['metricName'];
              obj['dataVal'] = typeof (val['data']) == 'number' ? val['data'] : val['data'].fetchTime;
              obj['module'] = val['module'];
              obj['time'] = val['time'];
              obj['data'] = val;
              tableData.push(obj);
            }
          }
        }
      } else {
        for (let s = 0; s < itemArr.length; s++) {
          let obj: any = {};
          let val = itemArr[s];
          obj['metricName'] = val['metricName'] == 'navigationTiming' ? 'TTFB' : val['metricName'];
          obj['dataVal'] = typeof (val['data']) == 'number' ? val['data'] : val['data'].fetchTime;
          obj['module'] = val['module'];
          obj['time'] = new Date().getTime();
          obj['data'] = val;
          tableData.push(obj);
        }
      }
      return tableData;
    }
    function openPermaceInfo(item: object) {
      visible.value = true;
      permace_time.value = item.time;
      permace_name.value = item.metricName;
      navigatorInformation.value = item.data.navigatorInformation;
      if ((typeof item.data.data) == 'number') {
        permace_value.value = item.data.data;
        loadInfo.value = false;
        loadInfoData.value = {};
      } else {
        permace_value.value = item.data.data.timeToFirstByte;
        loadInfo.value = true;
        loadInfoData.value = item.data.data;
      }
      // permace_value.value = (typeof item.data.data) == 'number' ? item.data.data : item.data.data.fetchTime;
    }
    function filterPermaceInfo(item: object) {
      let filterData = dataTotal[item.data.metricName];
      dataSource.result = getTableItem(filterData, 'start');
    }
    function closeModal() {
      visible.value = false;
    }
    function filterPermaceInfoByTime() {
      dataSource.result = getTableItem(dataTotal, '');
    }
    return {
      theme,
      time,
      locale,
      dataSource,
      columns,
      dataTotal,
      TTFBTotal,
      FCPTotal,
      LCPTotal,
      FIDTotal,
      TBTTotal,
      networkInformationVal,
      visible,
      permace_time,
      permace_value,
      permace_name,
      loadInfo,
      loadInfoData,
      navigatorInformation,
      renderItem,
      getTableItem,
      openPermaceInfo,
      filterPermaceInfo,
      closeModal,
      filterPermaceInfoByTime
    }
  }
})
</script>
<style>
</style>
