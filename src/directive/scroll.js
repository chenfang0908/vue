
import Vue from 'vue';

scroll.install = function(Vue){
    Vue.directive('scroll', {
        bind: (el, binding, vnode) => {
        // 是否执行回调事件
        let isCallback = true
        // 距离底部剩余距离开始触发回调
        let distance = 100 
        // 监听滚动事件
        el.onscroll = (e) => {
            // 获取当前节点可滚动的距离
            let scrollHeight = e.target.scrollHeight - e.target.clientHeight
            // 获取节点剩余可滚动的高度
            let residualHeight = scrollHeight -  e.target.scrollTop;
            //  滚动到指定区域执行回调事件
            if ((typeof binding.value.onScroll === 'function') && residualHeight <= distance && isCallback) {
            // 执行事件回调函数
                binding.value.onScroll();
                isCallback = false
            }  else if (residualHeight > distance) {
                isCallback = true
            }
        } 
        }
    })
}
  export default scroll;