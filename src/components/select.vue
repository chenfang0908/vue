<template>
<div>
    
    <el-select v-model="val" placeholder="请选择" @change="change">
        <el-option
        v-for="item in data"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
</div>
</template>

<script>
  export default {
    props:{
        callback: {   //筛选后的回调
            type: Function,
            default:function(){}
        },
        data: Array, //必须包含label value [{label:'111',value:2}], 用来渲染下拉列表
        selectVal : [String, Number],  //默认选中值
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