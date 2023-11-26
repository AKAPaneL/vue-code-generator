const { toSmallCamelCase, toBigCamelCase } = require("../../utils/camelCase")
/**
 * 生成 vue 文件内容--------
 */
function getListPageTemplate(singleConfig){
    // 根据 单个 配置 生成树状结构页面 vue 文件内容
    const { subMenu } = singleConfig
    const variable = toSmallCamelCase(subMenu)
    const content = `<template>
    <div style="width:100%;height:98%" v-loading="pageLoading">
    
        <basic-container>

            <!-- 搜索条件 -->
            <el-switch v-model="isDisplaySearchForm" :active-text="displayOrHiddenSearchFormText" @change="displayOrHiddenSearchForm"></el-switch>
    
            <el-form :model="searchData" id="search_form" ref="search_form" class="search_form"> 
                
                <div class="search-form-left mie_voucher_normal_panel">

                <!-- 员工编号 --> 
                <el-form-item class="mie_voucher_header_item" prop="employeeCode" v-if="haveCurrentFieldAuth('employeeCode')"> 
                    <div class="mie_voucher_header_item_left" > 员工编号 :</div>
                    <el-input class="mie_input" placeholder="请输入员工编号" v-model="searchData.employeeCode" clearable>
                    </el-input>
                </el-form-item> 

                <!-- 姓名 --> 
                <el-form-item class="mie_voucher_header_item" prop="name" v-if="haveCurrentFieldAuth('name')"> 
                    <div class="mie_voucher_header_item_left" > 员工姓名 :</div>
                    <el-input class="mie_input" placeholder="请输入姓名" v-model="searchData.name" clearable>
                    </el-input>
                </el-form-item> 

                <!-- 手机号码 --> 
                <el-form-item class="mie_voucher_header_item" prop="mobile" v-if="haveCurrentFieldAuth('mobile')"> 
                    <div class="mie_voucher_header_item_left" > 手机号码 :</div>
                    <el-input class="mie_input" placeholder="请输入手机号码（模糊查询）" v-model="searchData.mobile" clearable>
                    </el-input>
                </el-form-item>

                <div class="mie_voucher_header_item_wrap"></div>

                </div>
                
            </el-form>

            <!-- 操作行 -->
            <div id="page_btn_line" class="list-page-btn-line">
                <div>
                    <el-button type="primary" plain class="mie_btn2" @click="handleSearch">搜索</el-button>
                    <div v-if="haveIdFieldAuth">
                        <el-button type="info" plain class="mie_btn2" @click="exportExcel">导出Excel</el-button>
                        <el-button type="danger" plain class="mie_btn2" @click="handleMultiRemove">批量删除</el-button>
                        <el-button type="success" plain class="mie_btn2" @click="toAdd">新增</el-button> 
                    </div>
                </div>
            </div>
            
            <!-- 具体表格 -->
            <base-table ref="hr_employee_list" 
                tableBoxId="hr_employee_list" 
                :table-head="tableHead" 
                :table-data="tableData" 
                resize-type="page"
                :is-paged="true"
                :prop-size="size"
                :cur-page="current"
                :propTotal="total"
                :has-checkbox-col="true"
                @handleMultiCheck="handleMultiCheck"
                @getList="getList">
            </base-table>
    
        </basic-container>

        <!-- 应用了嵌套路由 --> 
        <router-view></router-view>

    </div>
</template>

<script>
import baseTable from '@/components/base-table/baseTable.vue';
import commonList from '@/util/commonList';
import dataCell from '@/components/data-cell/dataCell.vue';
import ${ variable }List from "./${ variable }List.js";

export default {
    mixins: [commonList, ${ variable }List ],
    components: {
        baseTable,
        dataCell
    },
};
</script>

<style scoped>
@import "../../../asset/less/miebase.less";
</style>

<style lang="scss" scoped>
@import "./${ variable }List.scss";
</style>`
    return content
}

/**
 * 生成 JS 内容--------
 */
function getListPageJs(singleConfig){
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
import { get${BigVariable}List, remove${BigVariable}, save${BigVariable}, searchUrl } from "@/api-url/${topMenu}/${variable}";

export default {

  data() {
    return {
        //当前选择的表格行数据
        selectedRowList: [],
        // 校验规则
        ${rulesStr}
    };
  },

  computed: {

  },

  created(){
    //以下都是commonList的标准变量
    this.tableHead = [{ prop: 'reno', label: '序号',  value: '',width: 90}
    , { prop: 'account', label: '账号', text: '', value: '',minWidth: 150}
    , { prop: 'name', label: '昵称', text: '', value: '',minWidth: 150}
    , { thType:'image', prop: 'avatar', label: '头像', text: '', value: '',minWidth: 150}
    , { prop: 'phone', label: '手机号码', text: '', value: '',minWidth: 150}
    , { prop: 'email', label: '邮箱', text: '', value: '',minWidth: 150}
    , { prop: 'roleName', label: '所属角色', text: '', value: '',minWidth: 150}
    , { prop: 'app', label: '所属系统', text: '', value: '',minWidth: 150}
    , { thType:'tag', prop: 'status', label: '用户状态', text: '', value: '',minWidth: 150, formatMap:this.statusMapping }
    , { thType:'custom', prop: 'isOperator', label: '是否操作员', text: '', value: '',minWidth: 150}

    , { thType: "btn", prop: 'btn', label: '操作', fixed: "right", width: 300, btns:[]}];

    this.tableHead[this.tableHead.length - 1].btns = [
      { functionName:"编辑", clickMethod: "toEdit", color: "blue" },
      { functionName:"删除", clickMethod: "toRemove", color: "red" },
    ];

    this.searchUrl = searchUrl
    this.isPaged = true;
    this.getList(); //commonList的方法
  },

  mounted() {

  },

  methods: {
    // 搜索
    handleSearch(){
        this.current = 1
        this.getList()
    },

    // 初始化树状结构
     toAdd(){
      this.$router.push({ path: "/hr/employee-list/v" });
    },

    toEdit(row){
      this.$router.push({ path: "/hr/employee-list/v?id=" + row.id });
    },

    // 导出excel 
    exportExcel(){

    },

    // 批量删除按钮
	handleMultiRemove(){
		this.toRemove(this.selectedRowList)
	},

    // 删除某条记录
    async toRemove(data){

      if(!data || data.length<=0) return this.$message.warning('请先选择需要删除的记录')

      await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      let ids = ''
      if(Array.isArray(data)){
        ids = data.map(item=>item.id).join(',')
      }else{
        ids = data.id
      }

      setShowLoading(true)
      removeAuthUserInfo({ ids }).then(({ data:res })=>{
        if(res.success){
          this.$message.success('删除成功！')
          this.getList()
        }else{
          this.$message.wanring('删除失败！错误信息：'+ res.msg||'???')
        }
      }).catch(()=>{
        setShowLoading(false)
      })

    },
  },
}; `
    return content
}

/**
 * 生成 scss 文件内容--------
 */
function getListPageCss(singleConfig){
    // 文件名 --创建 三个 文件
    const content = `.list-page-btn-line::v-deep{
    margin:10px 30px 30px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}`
    return content
}

module.exports = {
    getListPageTemplate,
    getListPageCss,
    getListPageJs
}