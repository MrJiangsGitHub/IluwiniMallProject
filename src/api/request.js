import axios from "axios"
import store from '../store/index.js'
import router from '../router/index.js'
import {
    Toast
} from "vant"
const instance = axios.create({
    baseURL: 'http://api.w0824.com' + '/api',
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 设置超时时间
    // config.timeout = 10000;
    // 开启loading
    // console.log(store.state.token);
    // 在这里写入token带个后台，进行验证(每次请求的时候把token传入请求头中带给后台验证)
    if (store.state.token) {
        config.headers['token'] = store.state.token
    } else {
        router.push('/login')
    }
    config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据
    // 在发送请求之前做些什么
    Toast.loading({
        message: "加载中",
        forbidClick: true
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    Toast.clear()
    // 对响应数据做点什么
    // 如果登录失败清除token和用户信息，防止重复利用同一个token
    let { status, message } = response.data
    if (status === 40001) {
        Toast(message)
        // 清除token用户信息
        store.commit('clearUser')
        router.push('/login')
        return;
    }
    return response.data // 直接返回响应的data数据
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance;