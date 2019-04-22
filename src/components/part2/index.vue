<template>
    <div>
        <scroll-list></scroll-list>
        <div style="margin-bottom:40px;"></div>
        <book-mark :otherData="otherData" :callback="filterListInfo"></book-mark>
    </div>
</template>
<script>
import ScrollList from '@/components/part2/scrollList';
import BookMark from '@/components/part2/bookMark';
export default {
    components:{
        ScrollList,
        BookMark
    },
    data(){
        return{
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
        filterListInfo(data){
            // 查询列表
            console.info(data);
        }
    }
}
</script>
<style lang="less" scoped>

</style>


