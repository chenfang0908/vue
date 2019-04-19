<template>
    <div class="home">
        <div class="flex">
            <v-select :data="selectData" :selectVal="val" :callback="queryInfo"></v-select>
        </div>
        <div class="flex">
            <part-two></part-two>
        </div>
        <div class="flex">
            
        </div>
        <div class="flex">
            
        </div>
    </div>
</template>

<script>
import VSelect from '@/components/select';
import PartTwo from '@/components/part2';
import { SelectData } from '@/config';
export default {
    name: "home",
    data(){
        return{
            val:'选项2',
            selectData : SelectData,
        }
    },
    components: {
        VSelect,
        PartTwo
    },
    methods:{
        queryInfo(val){
            console.info('可进行筛选后的查询',val);
        },
    }
};
</script>
<style lang="less" scoped>
.home{
    display: flex;
    .flex{
        flex: 1;
        padding: 0 30px;
        min-height: 100vh;
        border-right: 1px solid #e6e6e6;
    }
}
</style>

