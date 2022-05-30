import Vue from 'vue'
import moment from 'moment'
// 时间装换
Vue.filter('dateTime',(date,format='YYYY-MM-DD HH:mm:ss')=>{
return moment(date).format(format)
})

Vue.filter('timedate',(time,format='YYYY-MM-DD HH:mm:ss')=>{
    return moment.unix(time).format(format)
    })