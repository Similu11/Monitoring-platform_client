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
        <a-button type="primary" class="errorBack_date_search">
          <template #icon>
            <SearchOutlined />
          </template>
          查询
        </a-button>
      </a-config-provider>
    </a-layout-header>
    <a-layout-content class="performance_content">
       <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
            <a-button v-for="tag in record.tags" type="default" size="Default">{{tag}}</a-button>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="default" size="Default" @click='lookInfo'>查看日志</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-content>
    <a-modal v-model:visible="visible" title="" @ok="handleOk" :footer="null" class="errorBack_modal">
       <a-tabs v-model:activeKey="activeKey" class='errorBack_tabs'>
        <a-tab-pane key="1" tab="基本信息">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="场景重现">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="映射源码">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </a-modal>
  </a-layout>
</template>
<script  lang="ts">
import { inject, onMounted, ref } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { SearchOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SearchOutlined
  },
  setup() {
    const theme = inject('model');
    const locale = ref(zhCN.locale);
    let time = ref('');
    let activeKey = ref('');
    let visible = ref(false);
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
    function handleOk(){

    };
    function lookInfo(){
      visible.value = true;
    };
    return {
      theme,
      locale,
      time,
      dataSource,
      columns,
      activeKey,
      visible,
      handleOk,
      lookInfo
    }
  }
}

</script>
<style>
</style>
