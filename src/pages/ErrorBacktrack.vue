<template>
  <a-layout>
    <a-layout-header class="errorBack_head">
      <a-config-provider :locale="locale">
        时间:
        <a-date-picker
          v-model:value="time"
          :showToday="false"
          placeholder="请选择日期"
          class="performance_date_picker"
        />
        <a-button type="primary" class="errorBack_date_search" @click="filterError">
          <template #icon>
            <SearchOutlined />
          </template>
          查询
        </a-button>
      </a-config-provider>
    </a-layout-header>
    <a-layout-content class="performance_content">
      <a-table :dataSource="dataSource.result" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'tags'">
            <a-button v-for="tag in record.tags" type="default" size="Default">{{ tag }}</a-button>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="default" size="Default" @click="lookInfo(record)">查看日志</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-content>
    <a-modal
      v-model:visible="visible"
      title
      @cancel="handleOk"
      :footer="null"
      class="errorBack_modal"
    >
      <a-tabs v-model:activeKey="activeKey" class="errorBack_tabs" @change="tabChange">
        <a-tab-pane key="1" tab="基本信息">
          <a-row>
            <a-col :span="16" class="Error_modal_left_col">
              <a-row class="Permace_modal_left_col_row">
                摘要信息
                <a-divider class="Permace_dashed" dashed />
                <div class="Permace_modal_left_col_row_div">生成时间&nbsp;&nbsp;{{errorInfo.time}}</div>
                <div class="Permace_modal_left_col_row_div">上报时间&nbsp;&nbsp;{{errorInfo.time}}</div>
                <div class="Permace_modal_left_col_row_div">
                  异常内容&nbsp;&nbsp;
                  <span class="Error_modal_info">{{ errorInfo.message }}</span>
                </div>
                <div class="Permace_modal_left_col_row_div">行信息&nbsp;&nbsp;{{ errorInfo.lineno }}</div>
                <div class="Permace_modal_left_col_row_div">列信息&nbsp;&nbsp;{{ errorInfo.colno }}</div>
                <div class="Permace_modal_left_col_row_div">
                  URL&nbsp;&nbsp;
                  <span class="modal_span_url">{{ errorInfo.scriptURL }}</span>
                </div>
              </a-row>
              <a-row class="Permace_modal_left_col_row">
                异常堆栈
                <a-divider class="Permace_dashed" dashed />
                <textarea disabled class="Error_modal_info_paner">{{ errorInfo.stack }}</textarea>
              </a-row>
            </a-col>
            <a-col :span="7" class="Error_modal_right_col">
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
                >网络类型:&nbsp;&nbsp; {{ navigatorInformation.effectiveType }}</div>
                <div
                  class="Permace_modal_left_col_row_div"
                >有效带宽:&nbsp;&nbsp; {{ navigatorInformation.downlink }}M</div>
                <div
                  class="Permace_modal_left_col_row_div"
                >信号延迟:&nbsp;&nbsp; {{ navigatorInformation.rtt }}</div>
              </a-row>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="场景重现">
          <div class="errorVedio_suspend" v-show="videoSuspend" @click="videoBegin"></div>
          <div class="errorVedio" id="errorVedio"></div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="映射源码">
          <a-row class="Permace_modal_left_col_row">
            <a-upload
              v-model:file-list="fileLists.result"
              name="file"
              :multiple="false"
              :showUploadList="false"
              action="http://localhost:8852/uploadSourceMapByLog"
              :headers="headers"
              :before-upload="filterFile"
            >
              <a-button type="primary" class="error_date_search">
                <template #icon>
                  <UploadOutlined />
                </template>
                上传SourceMap
              </a-button>
            </a-upload>
            <a-divider class="Permace_dashed" dashed />映射代码行:
            <textarea class="Permace_modal_code">{{ sourceMapAnalysisData.line }}</textarea>映射代码:
            <textarea class="Permace_modal_code">{{ sourceMapAnalysisData.code }}</textarea>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </a-layout>
</template>
<script  lang="ts">
import { inject, onMounted, ref, reactive, toRefs, getCurrentInstance } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons-vue';
import rrwebPlayer from 'rrweb-player';
export default {
  components: {
    SearchOutlined,
    UploadOutlined
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const theme = inject('model');
    let spinTag = inject('spinTag');
    const locale = ref(zhCN.locale);
    const headers = reactive<object>({
      authorization: 'authorization-text',
      module: theme._value
    });
    let fd = new FormData();
    let errorInfo = ref<object>({});
    let tableSelector = ref<object>({});
    let time = ref('');
    let activeKey = ref('');
    let sourceMapAnalysisData = reactive({
      line: "",
      code: ""
    });
    let fileLists = reactive<object>({
      result: []
    });
    let visible = ref(false);
    let videoSuspend = ref(true);
    let dataSource = reactive<object>({
      result: []
    });;
    const navigatorInformation = reactive({
      deviceMemory: '',
      hardwareConcurrency: "",
      effectiveType: "",
      downlink: "",
      rtt: ""
    });//设备类型
    const columns = ref([{
      title: '异常内容',
      name: '异常内容',
      dataIndex: 'message',
      key: 'message',
    },{
      title: '日期',
      key: 'time',
      dataIndex: 'time',
    },{
      title: '项目名',
      key: 'module',
      dataIndex: 'module',
    }, {
      title: '操作',
      key: 'action',
    }]);
    function handleOk() {
      let vedio = <HTMLElement>document.getElementById('errorVedio');
      vedio.innerText = '';
      videoSuspend.value = true;
      sourceMapAnalysisData.code = '';
      sourceMapAnalysisData.line = '';
    };
    function lookInfo(item: object) {
      errorInfo.value = item.data;
      tableSelector.value = item.data;
      visible.value = true;
    };
    function filterError() {
      // console.log(fileListsv)
    };
    onMounted(() => {
      fetch('/api/getSourceMapLog', { method: 'post', body: JSON.stringify({ model: theme._value }) }).then(res => res.json()).then(data => {
        let resData = JSON.parse(data.result).reverse();
        spinTag.value = false;
        let arr: Array<object> = [];
        resData.forEach((item: object) => {
          let obj = {
            message: item.message,
            module: item.module,
            data: item,
            time:item.time
          }
          arr.push(obj);
        })
        dataSource.result = arr;
        toRefs(dataSource);
      })
      fetch('/api/getPermaceByName', { method: 'post', body: JSON.stringify({ model: theme._value, name: ['networkInformation'] }) }).then(res => res.json()).then(data => {
        if (data.status == 200) {
          navigatorInformation.deviceMemory = data.result['networkInformation'][0].navigatorInformation.deviceMemory;
          navigatorInformation.hardwareConcurrency = data.result['networkInformation'][0].navigatorInformation.hardwareConcurrency;
          navigatorInformation.effectiveType = data.result['networkInformation'][0].data.effectiveType;
          navigatorInformation.downlink = data.result['networkInformation'][0].data.downlink;
          navigatorInformation.rtt = data.result['networkInformation'][0].data.rtt;
        }
      })
    })
    function videoBegin() {
      videoSuspend.value = false;
      fetch('/api/getRrwebLog', { method: 'post', body: JSON.stringify({ module: theme._value }) }).then(res => res.json()).then(data => {
        let VideoData = JSON.parse(data.result);
        new rrwebPlayer({
          target: document.getElementById('errorVedio'), // customizable root element
          props: {
            events: VideoData[0].events
          },
        });
      })
    }

    function tabChange() {
      if (activeKey.value == '3') {
        fetch('/api/analysisSourceMapLog', { method: 'post', body: JSON.stringify({ scriptURI: tableSelector.value.scriptURL, colno: tableSelector.value.colno, lineno: tableSelector.value.lineno, module: theme._value }) }).then(res => res.json()).then(data => {
          if (data.status == 500) {
            proxy.$message.error(data.msg);
          } else {
            sourceMapAnalysisData.line = JSON.parse(data.result);
            sourceMapAnalysisData.code = data.code;
            toRefs(sourceMapAnalysisData);
          }
        })
      }
    }

    function ourMap_UploadStart() {
      fd.append('model', theme._value);
      fetch('/api/uploadSourceMapByLog', {
        method: 'post',
        body: fd
      }).then(res => res.json()).then(data => {
        if (data.status == 200) {
          fetch('/api/analysisSourceMapLog', { method: 'post', body: JSON.stringify({ scriptURI: tableSelector.value.scriptURL, colno: tableSelector.value.colno, lineno: tableSelector.value.lineno, module: theme._value }) }).then(res => res.json()).then(dataInfo => {
            if (dataInfo.status == 500) {
              proxy.$message.error(dataInfo.msg);
            } else {
              sourceMapAnalysisData.line = JSON.parse(dataInfo.result);
              sourceMapAnalysisData.code = dataInfo.code;
              toRefs(sourceMapAnalysisData);
            }
          })
        }
      })
    }
    function filterFile(file: object, fileList: Array<object>) {
      let s = file.name;
      let mapFile = `${tableSelector.value.scriptURL.substring(tableSelector.value.scriptURL.lastIndexOf('/') + 1).trim()}.map`;
      if (mapFile === s) {
        fd.append('file', file);
        ourMap_UploadStart();
        return false;
      }
      proxy.$message.error('请上传正确的sourcemap文件');
      return false;
    };
    return {
      theme,
      locale,
      time,
      dataSource,
      columns,
      activeKey,
      visible,
      errorInfo,
      fileLists,
      handleOk,
      lookInfo,
      filterError,
      navigatorInformation,
      videoSuspend,
      headers,
      videoBegin,
      tableSelector,
      sourceMapAnalysisData,
      tabChange,
      filterFile
    }
  }
}

</script>
<style>
</style>
