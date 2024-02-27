import { setShowLoading } from "@/util/loadingUtil";
import { getBuscardFitupGroupTree, removeBuscardFitupGroup, saveBuscardFitupGroup } from "@/api-url/buscard/buscardFitupGroup";

export default {

  data() {
    return {
      //当前选择 / 新增的表单数据
      formData: {},
      treeSearchText:'',
      //树形结构的数据
      buscardFitupGroupTree: [],

      templateGroupNameRule: [
            { required: true, message: "请输入组名称", trigger: "blur" },
            { min: 1, max: 25, message: "长度在1 - 25个字符之间", trigger: "blur" },
          ],
        idRule: [
            { required: true, message: "请输入组编号", trigger: "blur" },
            { min: 1, max: 25, message: "长度在1 - 25个字符之间", trigger: "blur" },
          ],
        
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
      this.getBuscardFitupGroupTree().finally(()=>{
        setShowLoading(false)
      })
    },

    async getBuscardFitupGroupTree(params){
      const { data:res } = await getBuscardFitupGroupTree(params)
      if(res.success){
        this.buscardFitupGroupTree = res.data
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

      saveBuscardFitupGroup(this.formData).then(({ data:res }) => {
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
      removeBuscardFitupGroup({ ids: this.formData.id }).then(({ data:res }) => {
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
        templateGroupName:'',id:'',
      };
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
      })
    },
  },
}; 