<template>
  <a-layout>
    <a-layout-header class="sourMap_head">
      版本选择:
      <a-select v-model:value="version" style="width: 100px">
        <a-select-option
          v-for="item in modeArr.fileVersion"
          :key="item.key"
          :value="item.value"
        >{{ item.value }}</a-select-option>
      </a-select>
      <a-upload
        v-model:file-list="fileLists.result"
        name="file"
        :multiple="true"
        :showUploadList="false"
        action="https://localhost:8852/uploadSourceMap"
        :headers="headers"
        :before-upload="filterFile"
        :customRequest="inset"
      >
        <a-button type="primary" class="errorBack_date_search">
          <template #icon>
            <UploadOutlined />
          </template>
          上传SourceMap
        </a-button>
      </a-upload>
    </a-layout-header>
    <a-layout-content class="sourMap_content">
      <a-row>
        <a-col :span="12" class="sourMap_errorInsert">
          <div class="sourMap_errorInsert_top"></div>
          <textarea class="ourMap_errorInsert_main" v-model="insert"></textarea>
          <a-button
            class="sourMap_errorStart errorBack_date_search"
            type="primary"
            @click="ourMap_InsertStart"
          >解析</a-button>
        </a-col>
        <a-col :span="12" class="sourMap_outPut">
          <div class="sourMap_outPut_top"></div>
          <textarea class="ourMap_outPut_main" v-model="outPut"></textarea>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-modal
      v-model:visible="visible"
      title="上传文件详情"
      :maskClosable="false"
      @cancel="handleCancle"
      class="sourMap_modal"
    >
      <div class="sourMap_modal_fileList_parent">
        <a-list class="sourMap_fileList" item-layout="horizontal" :data-source="fileLists.result">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a-button type="text" @click="removeFileInFileList(item)">
                  <template #icon>
                    <delete-two-tone />
                  </template>
                </a-button>
              </template>
              <a-list-item-meta :description="item.name">
                <template #avatar>
                  <file-two-tone />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </div>
      <template #footer>
        <a-input v-model:value="file_version" class="file_version_input" placeholder="请输入文件版本" />
        <a-button class type="primary" @click="ourMap_UploadStart">确定</a-button>
      </template>
    </a-modal>
  </a-layout>
</template>
<script  lang="ts">
import { ref, inject, onMounted, reactive, toRefs, provide, getCurrentInstance } from 'vue';
import { CloudOutlined, UploadOutlined, FileTwoTone, DeleteTwoTone } from '@ant-design/icons-vue';
export default {
  components: {
    CloudOutlined,
    UploadOutlined,
    FileTwoTone,
    DeleteTwoTone
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    let modeArr = reactive<object>({
      fileVersion: []
    });
    const model = inject('model');
    let version = ref<string>('');
    let insert = ref<string>('');
    let outPut = ref<string>('');
    let file_version = ref<string>('');
    let visible = ref<boolean>(false);
    let nextFalg = ref<boolean>(true);
    let fileLists = reactive<object>({
      result: []
    });
    let fd = new FormData();
    const headers = reactive<object>({
      authorization: 'authorization-text',
    });
    onMounted(() => {//dom首次渲染完成之后，才能获取到真实的dom
      fetch('http://localhost:8852/getSourceMapVersion').then(res => res.json()).then(data => {
        modeArr.fileVersion = data.fileVersion;
        toRefs(modeArr);
      })
    });
    function ourMap_InsertStart() {
      if (insert.value != '' && version.value != '') {
        //{"scriptURI":"http://127.0.0.1:5500/examples/sourcemap/dist/main.js","lineNo":1,"columnNo":84}
        fetch('http://localhost:8852/analysisFile', {
          method: 'post',
          body: JSON.stringify({
            errFileInfo:insert.value,
            errFileVersion: version.value
          })
        }).then(res => res.json()).then(data => {
          if (data.status == 500) {
            proxy.$message.error(data.msg);
            outPut.value = '';
          } else {
            proxy.$message.success(data.msg);
            outPut.value = data.result;
          }
        })
      } else {
        proxy.$message.info('请输入sourceMap文件报错信息和sourceMap文件版本号');
      }
    };

    function filterFile(file: object, fileList: Array<object>) {
      let s = file.name.split('.');
      if (s.indexOf('map') == '-1') {
        let arr = fileList;
        arr.forEach((item: object, index: number) => {
          if (item.name == file.name) {
            arr.splice(index, 1);
          }
        });
        fileLists.result = arr;
        toRefs(fileLists);
        return false;
      } else {
        return true;
      }

    };

    function handleCancle() {
      fileLists.result = [];
      toRefs(fileLists);
      file_version.value = '';
      fd = new FormData();
    };
    function removeFileInFileList(s: object) {
      let arr = fileLists.result;
      arr.forEach((item: object, index: number) => {
        if (item.name == s.name) {
          arr.splice(index, 1);
          fd.delete(s.name);
        }
      });
      fileLists.result = arr;
      toRefs(fileLists);
      if (!fileLists.result.length) {
        visible.value = false;
      }
    }
    function ourMap_UploadStart() {
      if (file_version.value == '') {
        proxy.$message.info('请输入版本号,相同版本将会覆盖源文件'); //这里需要进行验证，必须得是数字和.
        return;
      }
      fd.append('version', file_version.value);
      fd.append('model', model._value);
      fetch('http://localhost:8852/uploadSour', {
        method: 'post',
        body: fd
      }).then(res => res.json()).then(data => {
        visible.value = false;
        proxy.$message.info(data.message);
        fd = new FormData();
        fileLists.result = [];
        file_version.value = '';
        toRefs(fileLists);
        fetch('http://localhost:8852/getSourceMapVersion').then(res => res.json()).then(data => {
          modeArr.fileVersion = data.fileVersion;
          toRefs(modeArr);
        })
      })
    }

    function inset(data) {
      visible.value = true;
      fd.append('file', data.file);
    }

    return {
      modeArr,
      version,
      headers,
      file_version,
      ourMap_InsertStart,
      ourMap_UploadStart,
      filterFile,
      removeFileInFileList,
      inset,
      outPut,
      insert,
      fileLists,
      visible,
      handleCancle
    }
  }
}

</script>
<style>
</style>
