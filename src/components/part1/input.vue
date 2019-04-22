<template>
    <div class="m-b-20" ref="box">
        <span>搜索输入框：</span>
        <div class="search-box">
            <el-input
                :placeholder="placeholder"
                v-model.trim="val"
                autocomplete="off"
                size="small "
                @keyup.enter.native="search()"
            >
            </el-input>
            <i class="el-icon-search" @click="search()"></i>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        placeholder:String,
        callback: Function
    },
    data(){
        return{
            val:''
        }
    },
    created(){
      
    },
    methods:{
        search(){
            this.callback(this.val);
        }
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
    /deep/ .el-checkbox{
        margin-right: 5px;
    }
    .search-box{
        width: 220px;
        display: inline-block;
    }
}
</style>

