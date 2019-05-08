<template>
    <div>
        {{data[0].name}}
        <button @click="add">点击{{dateTitle}}</button>
        <div class="calendar-box">
            
            <!-- <div class="cal_date_opt f_left">
                <i class="iconfont pointer" @click='preDate'> 《 </i>
                <el-date-picker v-model="dateTitle" type="date" @change='changeDateView'></el-date-picker>
                <i class="iconfont pointer" @click='nextDate'> 》 </i>
            </div> -->
            <full-calendar ref="calendar" :config="config" :events="calendarData"></full-calendar>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props:['data'],

    data(){
        return{
            calendarData:[
                {
                title : '晚饭',  // 事件内容
                start : '2019-05-07 18:00', // 事件开始时间
                end : '2019-05-07 19:30',   // 事件结束时间
                backgroundColor: 'red',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                borderColor:'red',
                },
                {
                title : '哈哈哈',  // 事件内容
                start : '2019-05-07 16:00', // 事件开始时间
                end : '2019-05-07 18:30',   // 事件结束时间
                backgroundColor: 'orange',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                borderColor:'orange',
                },
                {
                title : '哈哈哈333333333',  // 事件内容
                start : '2019-05-07 10:00', // 事件开始时间
                end : '2019-05-09 10:30',   // 事件结束时间
                backgroundColor: 'orange',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                borderColor:'orange',
                },
                {
                title : '哈哈哈123213',  // 事件内容
                start : '2019-05-07 12:00', // 事件开始时间
                end : '2019-05-07 13:30',   // 事件结束时间
                backgroundColor: 'orange',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                borderColor:'orange',
                },
                {
                title : '哈哈哈',  // 事件内容
                start : '2019-05-07 06:00', // 事件开始时间
                end : '2019-05-07 08:30',   // 事件结束时间
                backgroundColor: 'orange',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                borderColor:'orange',
                },
            ],
            config: {   // full-calendar的配置参数
                header: { //表头信息
                    left: '',
                    center: 'prev,title,next',
                    // right: ''
                },
                footer:false, //默认false，不显示尾部信息
                height: 500,
                // contentHeight: 500, //日历表格的高度
                defaultView: "agendaWeek", //默认显示month。 
                // month 一页显示一月
                // basicWeek 一页显示一周
                // basicDay 一页显示一天
                // agendaWeek 一页显示一周， 显示详细的24小时
                // agendaDay 一页显示一天， 显示详细的24小时
                //
                firstDay: new Date().getDay(),  // 日历从哪一天开始 0=sunday
                weekends: true,  //在日历中是否显示周末， 默认为true
                // hiddenDays: [2,4], //数组形式，从0-6代表周日-周一
                columnHeader: true, // 是否显示列表头部信息
                // fixedWeekCount: false, // defaultView若为month，false按照月的实际周数显示，true固定显示6周
                weekNumbers: true, // defaultView若为month,则会在基本视图中左边一列显示周数。
                // businessHours: [ //自定义要强调的时间段：
                //     {
                //         dow: [ 1, 2, 3 ], // 周一 - 周三
                //         start: '08:00', // 8am
                //         end: '18:00' // 6pm
                //     },
                //     {
                //         dow: [ 4, 5 ], // 周四，周五
                //         start: '10:00', // 10am
                //         end: '16:00' // 4pm
                //     }
                // ],
                eventLimit: 4, //限制一天的显示事件数 默认为false
                columnFormat: "ddd M-D", //view中的每列的表头显示文本格式
                allDaySlot: false, // 在agenda 模式下显示是否显示all day
                firstHour: 8, // ???
                navLinks: true,  //允许天/周名称是否可点击
                selectable: true, //是否允许用户通过单击或拖动选择日历中的对象，包括天和时间。
                selectHelper: true, //当点击或拖动选择时间时，显示默认加载的提示信息，该属性只在周/天视图里可用。
                
                
                
                slotEventOverlap: false, //事件不可重叠
                // editable: false, //事件不可拖动缩放
                // eventLimit: true, // allow "more" link when too many events    
                // selectHelper: true,
                // unselectAuto: false,    // 设置当点击页面其他地方的时候，是否清除已选择的区域，值为布尔类型
                dayRender: (date, cell) => { // 切换至month是 触发
                    console.log(date);
                },
                loading: (isLoading, view) => { //日历开始加载的时候 isLoading参数为true触发一次, 日历加载完毕, isLoading参数为false触发一次
                    
                    // 显示时间标题
                    if(!isLoading){
                        this.dateTitle = this.$el.querySelector('.fc-toolbar h2').innerText;
                    }
                    console.info(124,isLoading,this.dateTitle);
                    
                },
                eventRender: (event, ele) => { //日程渲染之前触发
                    console.info(130,event);
                },
                // viewRender: function (view, element) { //渲染视图后
                // },
                // // 点击被创建的事件
                eventClick: (event, jsEvent, view) => {
                    console.log(event);
                },
                select: (start, end, event, view, resource) => {
                    
                },
                selectAllow: (selectInfo) => { //自定义可选取范围
                   
                },
                dayClick: (date, jsEvent, view) => { //日程点击，添加日程
                    jsEvent.stopPropagation();
                    this.calendarData.push(
                        {
                        title : '嘻嘻嘻',  // 事件内容
                        start : '2019-05-08 10:00', // 事件开始时间
                        end : '2019-05-08 12:30',   // 事件结束时间
                        backgroundColor: 'pink',       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
                        borderColor:'pink',
                        })
                    // this.selected = event;
                },
                eventMouseover: (calEvent, jsEvent, view) => {           
                    console.info(calEvent);
                },
            },
            dateTitle:''
        }
    },
    computed:{
        
    },
    methods:{
        add(){
            let obj = this.data[0];
            obj.name += 1;
            this.$set(this.data,0,obj)
        },
        // 跳转日期
        changeDateView(date) {
            this.$refs.calendar.fullCalendar('gotoDate', date);
            
        },
        preDate() {     // 上一视图日历
            this.$refs.calendar.fullCalendar('prev');
            // this.dateTitle = this.$refs.calendar
            // this.$el.querySelector('.fc-center h2')
            // this.changeCalTitle();
        },
        nextDate() {    // 下一视图日历
            this.$refs.calendar.fullCalendar('next');
            // this.changeCalTitle();
        },
    }
}
</script>
<style lang="less" scoped>
.red {
  background: red;
}

</style>
