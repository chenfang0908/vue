<template>
    <div>
        <div>滚动加载</div>
        <v-select :data="selectData" :selectVal="val" :callback="select"></v-select>
        <div class="scrollbar" v-scroll="scrollData">
            <ul class="scrollList">
                <li v-for="(val,key) in data" :key="key">第{{val}}条</li>
            </ul>
        </div>
    </div>
</template>
<script>
import VSelect from '@/components/select';
import { SelectData } from '@/config';
import { setInterval } from 'timers';
export default {
    props:{},
    data(){
        return{
            scrollData:{
                onScroll:this.onScroll,
                resetScrollTop: false
            },
            value1: 0,
            data:0,
            page:1,
            size:20,
            noMore: false,
            loading:false,
            val:'选项3',
            selectData : SelectData,
      
        }
    },
    components: {
        VSelect,
    },
    mounted(){
        this.queryInfo();  
    },
    methods:{
        onScroll(){

            // 仅作为调试使用
            if(this.page >=3){ 
                this.noMore = true;
                return;
            }
            this.page += 1;

            //注意此处需要判断loading和noMore得值
            // 当接口正在请求还未返回值是默认把 loading置为true， 当返回的list条数小于size时 则表示没有下一页   否则去请求接口
            // if(this.loading || this.noMore){
            //     return
            // }

            console.info('触发');
            this.queryInfo();            
        },
        queryInfo(){
            // 请求数据
            this.data += this.size;
        },
        select(val){
            console.info('可进行筛选后的查询',val);
            this.data = 0;
            this.page = 1;
            this.noMore = false;
            this.scrollData.resetScrollTop = true;
            //目的是 做一些筛选的时候 让滚动条回到初始状态
            this.$el.querySelector('.scrollbar').scrollTop = 0;
            this.queryInfo();   

        },
    }
}
</script>
<style lang="less" scoped>
.scrollbar{
    height: 300px;
    overflow-y: auto;
    border: 1px solid #e6e6e6;
}
.scrollbar::-webkit-scrollbar {/*滚动条整体样式*/
    width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.scrollbar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
     background-color: rgba(144,147,153,.2);
     opacity: 0.7;
}
.scrollbar::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 10px;
    background: none;
}
</style>


