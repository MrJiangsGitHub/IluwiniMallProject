import Vue from 'vue'
import moment from 'moment'
Vue.filter('dateTime',(date,format='YYYY-MM-DD HH:mm:ss')=>{
return moment(date).format(format)
})