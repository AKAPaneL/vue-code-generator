<template>
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
              :data="articleClassTree"
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
import articleClassConfig from "./articleClassConfig.js";

export default {
    mixins: [articleClassConfig],
    components: {

    },
};
</script>

<style scoped>
@import "../../../asset/less/miebase.less";
</style>

<style lang="scss" scoped>
@import "./articleClassConfig.scss";
</style>