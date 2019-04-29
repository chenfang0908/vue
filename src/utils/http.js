import axios from 'axios';
import Qs from 'qs';
import router from '@/router';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if(config.method  === 'post'){
            config.data = Qs.stringify(config.data);
        }
        config.headers.Authorization = '3D2D3347AFD247608E193F238F00655D';
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        if(response.data.errorCode === '81000001') {
            // 切换路由
            router.push({
                name: 'home'
            })
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 402:
                case 401:
                    // window.location.href = "login.jsp";
                    // 切换路由
                    router.push({
                        name: 'home'
                    })
                    break;
            }
        }
        if (error.request) {
            switch (error.request.status) {
                case 402:
                case 401:
                    // window.location.href = "login.jsp";
                    // 切换路由
                    router.push({
                        name: 'home'
                    })
                    break;
            }
        }
        return Promise.reject(error);
    });
    export const $http = axios;

    export default {
        install: function(vm) {
            vm.prototype.$http = axios
        }
    }