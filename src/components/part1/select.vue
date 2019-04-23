<template>
<div class="m-b-20">
    <span>下拉框组件：</span>
    <div class="select-box">
        <i class="el-icon-caret-bottom"></i>
        <el-select v-model="val" placeholder="" :filterable="filterable" @change="change">
            <el-option
            v-for="item in data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    
</div>
</template>

<script>
  export default {
    props:{
        callback: {   //筛选后的回调
            type: Function,
            default:function(){},
        },
        data: Array, //必须包含label value [{label:'111',value:2}], 用来渲染下拉列表
        selectVal : [String, Number],  //默认选中值
        filterable: { //是否可搜索
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
          val : this.selectVal || '',
      }
    },
    methods:{
        change(){
            this.callback(this.val);
        },
    }
  }
</script>
<style lang="less" scoped>
.m-b-20{
    margin-bottom: 20px;
    text-align: left;
    span{
        display: inline-block;
        width: 100px;
        text-align: right;
    }
}
</style>
