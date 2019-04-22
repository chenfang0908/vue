<template>
    <div>
        <v-select :data="selectData" :selectVal="val" :callback="queryInfo"></v-select>
        <v-dropdowm :data="dropdowmData" :title="title" :callback="queryInfo"></v-dropdowm>
        <v-input :placeholder="placeholder" :callback="queryInfo"></v-input>
        <book-mark :otherData="otherData" :callback="filterListInfo"></book-mark>
    </div>
</template>
<script>
import { SelectData, DropdowmData } from '@/config';
import vSelect from './select';
import vDropdowm from './dropdown';
import vInput from './input';
import BookMark from './bookMark';
export default {
    components:{
        vSelect,
        vDropdowm,
        vInput,
        BookMark

    },
    data(){
        return{
            val:'选项2',
            selectData : SelectData,
            dropdowmData:DropdowmData,
            title:'状态',
            placeholder:'设备标识/名称',
            otherData:[
                {
                    bookmarkName: "Unclassified",
                    id: "Unclassified",
                    children: []
                },
                {
                    bookmarkName: "Token",
                    id: "Token",
                    children: []
                }
            ]
        }
    },
    methods:{
        queryInfo(val){
            console.info('可进行筛选后的查询',val);
        },
    }
}
</script>
<style lang="less" scoped>

</style>


