<template>
    <div class="m-b-20">
        <span>下拉菜单：</span>
        <el-dropdown placement="bottom-start" trigger="click" @command="command">
            <el-button type="primary">
                {{title}}{{ activeNum ? `(${ activeNum })` : ''}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :class="v.color" :command="v.value" v-for="(v,k) in data" :key="k">
                    <el-checkbox v-model="v.isChecked"></el-checkbox>
                    <div class="name">{{v.label}}</div>
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
            isHaveAll:false,
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

            if(this.isHaveAll){
                if(this.data[0].isChecked){
                    num -= 1;
                }
            }
            return num;
        },
    },
    created(){
        this.isHaveAll = this.data[0] && this.data[0].value == 'all' ? true : false;
    },
    methods:{
        command(val){
            let status;
            let checkAllStatus; //判断当前点击的状态
            if(val == 'all'){
                checkAllStatus = !this.data[0].isChecked;
            }
            this.data.map(v=>{
                if(this.isHaveAll){ //是否有all选项
                    if(val == 'all'){
                        if(checkAllStatus){
                            v.isChecked = true;
                        }else{
                            v.isChecked = false;
                        }
                        status = v.isChecked;
                    }else{
                       if(v.value == val){
                           v.isChecked = !v.isChecked;
                           let obj = this.data[0];
                            if(v.isChecked){ //取消选中all
                                if(this.data.length == this.activeNum + 1){ //选中all
                                    obj.isChecked = true;
                                    this.$set(this.data,0,obj)
                                }
                            }else{
                                obj.isChecked = false;
                                this.$set(this.data,0,obj)
                            }
                            status = v.isChecked;
                        } 
                    }
                }else{
                    if(v.value == val){
                        v.isChecked = !v.isChecked;
                        status = v.isChecked;

                    }
                }
                
            })
            console.info(val,status);
            let data = {};
            if(val == 'all'){
                this.data.map(v=>{
                    if(this.data[0].isChecked){
                        data[v.value] = true;
                    }else{
                        data[v.value] = false;
                    }
                })

                delete data.all
                
            }else{
                data[val] = status;
            }
            this.callback(data);
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
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>

