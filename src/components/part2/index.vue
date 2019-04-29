<template>
    <div>
        <scroll-list></scroll-list>
        <div style="margin-bottom:40px;"></div>
        
    </div>
</template>
<script>
import ScrollList from '@/components/part2/scrollList';

export default {
    components:{
        ScrollList,
    },
    data(){
        return{
            
        }
    },
    methods:{
        filterListInfo(data){
            // 查询列表
            // console.info(data);
        }
    }
}
</script>
<style lang="less" scoped>

</style>


