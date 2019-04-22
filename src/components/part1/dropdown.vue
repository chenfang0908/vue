<template>
    <div class="m-b-20">
        <span>下拉菜单：</span>
        <el-dropdown placement="bottom-start" trigger="click" @command="command">
            <el-button type="primary">
                {{title}}{{ activeNum ? `(${ activeNum })` : ''}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :class="v.color" :command="v.value" v-for="(v,k) in data" :key="k">
                    <el-checkbox v-model="v.isChecked"></el-checkbox>{{v.label}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    props:{
        data: Array, //下拉数据
        // [{
        //     value: 'online', //可配置传参的字段
        //     label: '在线', //显示的名称
        //     isChecked:true, //是否选中
        //     color:'green' //选中框的颜色
        // }]
        title: String, //下拉框的标题
        callback:Function //选中后的回调
    },
    data(){
        return{
            
        }
    },
    computed:{
        activeNum:function(){
            let num = 0;
            this.data.map(v=>{
                if(v.isChecked){
                    num += 1;
                }
            })
            return num;
        },
    },
    methods:{
        command(val){
            let status;
            this.data.map(v=>{
                if(v.value == val){
                    status = v.isChecked;
                }
            })
            this.callback({val,status:!status});
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
}
</style>

