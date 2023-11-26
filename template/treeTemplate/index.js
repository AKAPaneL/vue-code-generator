const { toSmallCamelCase, toBigCamelCase } = require("../../utils/camelCase")
/**
 * 生成 vue 文件内容--------
 */
function getTreePageTemplate(singleConfig){
    // 根据 单个 配置 生成树状结构页面 vue 文件内容
    const { subMenu } = singleConfig
    const variable = toSmallCamelCase(subMenu)
    const content = `<template>
    <div class="tree_container">
      <!-- 左边 -->
      <div class="tree_left_wrapper">
        <!-- 树结构顶部搜索框 -->
        <div class="search_wrapper">
          <el-input v-model="treeSearchText" prefix-icon="el-icon-search" placeholder="请输入关键字搜索" @input="searchText"></el-input>
        </div>
        <!-- 树结构 -->
        <div class="tree_scroll">
            <el-tree
              ref="tree"
              node-key="id"
              :data="${variable}Tree"
              default-expand-all
              :expand-on-click-node="true"
              :filter-node-method="filterNode"
              @node-click="nodeClick"
            >
            </el-tree>
        </div>
      </div>
  
      <!-- 右边 -->
      <div class="form_right_wrapper">
        
        <!-- 顶部按钮行 -->
        <div class="form_top_operate">
          <el-button-group>
            <el-button type="primary" icon="el-icon-circle-check" @click.stop.prevent="save">保 存</el-button>
            <el-button type="info" icon="el-icon-remove-outline" plain @click.stop.prevent="reset">清 空</el-button>
          </el-button-group>
          <div>
            <el-button v-if="formData.id" type="danger" icon="el-icon-delete" plain @click.stop.prevent="remove">删 除</el-button>
          </div>
        </div>
  
        <!-- form表单 -->
        <el-form ref="form" class="tree_form" :model="formData"> 
          <div class="mie_voucher_normal_panel">
  
            <!-- 方案名称 -->
            <el-form-item class="mie_voucher_header_item" prop="schemeName" :rules="schemeNameRule">
              <div class="mie_voucher_header_item_left">方案名称 :</div>
              <el-input class="mie_input middle" placeholder="请输入方案名称" v-model="formData.schemeName"
                clearable></el-input>
            </el-form-item>
            
            <div class="mie_voucher_header_item_wrap"></div>
  
            <!-- 大屏跳转链接 -->
            <el-form-item class="mie_voucher_header_item" prop="screenLink" :rules="screenLinkRule">
              <div class="mie_voucher_header_item_left">大屏跳转链接 :</div>
              <el-input class="mie_input middle" placeholder="请输入大屏跳转链接" v-model="formData.screenLink"
                clearable></el-input>
            </el-form-item>
          </div>
  
        </el-form>
      </div>
    </div>
</template>

<script>
import ${ variable }Config from "./${ variable }Config.js";

export default {
    mixins: [${ variable }Config],
    components: {

    },
};
</script>

<style scoped>
@import "../../../asset/less/miebase.less";
</style>

<style lang="scss" scoped>
@import "./${ variable }Config.scss";
</style>`
    return content
}

/**
 * 生成 JS 内容--------
 */
function getTreePageJs(singleConfig){
    // 页面内容有三个
    const { subMenu, topMenu, mainField } = singleConfig
    const BigVariable = toBigCamelCase(subMenu)
    const variable = toSmallCamelCase(subMenu)

    let rulesStr = ``
    let formDataStr = ``
    mainField.forEach(item=>{
        rulesStr += `${item.name}Rule: [
            { required: true, message: "请输入${item.text}", trigger: "blur" },
            { min: 1, max: 25, message: "长度在1 - 25个字符之间", trigger: "blur" },
          ],
        `
        formDataStr += `${item.name}:'',`
    })
    const content = `import { setShowLoading } from "@/util/loadingUtil";
import { get${BigVariable}Tree, remove${BigVariable}, save${BigVariable} } from "@/api-url/${topMenu}/${variable}";

export default {

  data() {
    return {
      //当前选择 / 新增的表单数据
      formData: {},
      treeSearchText:'',
      //树形结构的数据
      ${ variable }Tree: [],

      ${rulesStr}
    };
  },

  mounted() {
    this.clear();
    this.initTreeData();
  },

  methods: {

    // 初始化树状结构
    async initTreeData() {
      setShowLoading(true);
      this.get${ BigVariable }Tree().finally(()=>{
        setShowLoading(false)
      })
    },

    async get${ BigVariable }Tree(params){
      const { data:res } = await get${ BigVariable }Tree(params)
      if(res.success){
        this.${ variable }Tree = res.data
      }else{
        this.message.error('网络错误！错误信息：' + res.msg)
      }
    },

    // 刷新节点，先获取树状结构，之后再设置当前选中节点
    async refreshTreeNode(){
      await this.initTreeData()
      this.setCurrentKey(this.formData.id)
    },
    
    // 保存当前方案
    async save() {
      // 校验
      await this.$refs["form"].validate();

      setShowLoading(true);

      save${ BigVariable }(this.formData).then(({ data:res }) => {
        setShowLoading(false);
        if (res.success) {
          this.formData = res.data;
          this.$message.success("保存成功");
          this.refreshTreeNode()
        } else {
          this.$message.error("保存失败！错误信息如下：" + res.msg);
        }
      })
      .catch((e) => {
        setShowLoading(false);
      });
    },

    async remove() {
      if(!this.formData.id) return
      await this.$confirm('该操作将永久删除该方案！是否继续?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      setShowLoading(true);
      remove${ BigVariable }({ ids: this.formData.id }).then(({ data:res }) => {
        setShowLoading(false);
        if (res.success) {
          this.$message({ message: "删除成功", type: "success" });
          this.clear();
          this.initTreeData();
        } else {
          this.$message.error("删除失败！错误信息如下：" + res.msg);
        }
      })
      .catch((e) => {
        setShowLoading(false);
      });
    },

    // 通过 id 设置当前选中节点
    setCurrentKey(id){
      this.$refs['tree'].setCurrentKey(id)
    },

    // 点击节点 回填对应数据
    nodeClick(data) {
      if(data.sourceData){
          this.formData = data.sourceData;
      }
    },

    // 树结构搜索
    searchText(val){
      this.$refs['tree'].filter(val);
    },

    // 过滤方法
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 清空按钮
    reset(){
      this.clear(),
      this.setCurrentKey(null)
    },

    // 清理数据
    clear() {
      this.formData = {
        id: null,
        ${formDataStr}
      };
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
      })
    },
  },
}; `
    return content
}

/**
 * 生成 scss 文件内容--------
 */
function getTreePageCss(singleConfig){
    // 文件名 --创建 三个 文件
    const content = `.tree_container{
    height: 100%;
    display: flex;
    background-color: #fff;

    .tree_left_wrapper{
        width: 30%;
        box-sizing: border-box;
        padding: 20px;
        border-right: 1px solid lightgrey;
    }
    .search_wrapper{
        padding-bottom: 20px;
    }
    .tree_scroll{
        height: calc(100% - 60px);
        overflow: auto;
    }
    
    .form_right_wrapper{
        width: 70%;
        padding: 20px;
        overflow: auto;
    }

    .form_top_operate{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        max-width: 600px;
        overflow: auto;
        &>div,&>button{
            flex-shrink: 0;
        }

    }

    .tree_form{
        height: calc(100% - 60px);
        overflow: auto;
    }
}`
    return content
}

module.exports = {
    getTreePageTemplate,
    getTreePageCss,
    getTreePageJs
}