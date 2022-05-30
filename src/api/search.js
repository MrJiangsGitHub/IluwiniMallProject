import request from './request.js'

// 搜索
// export function fetchSearchGoods(options) {
//     let {
//         value,
//         sort,
//         order,
//         page,
//         pagesize
//     } = options;
//     // 将对象转化成查询字符串方法一
//     // 对象 {value:"iphone",'sort':"buy",order:"desc",page:1,pagesiz:10}
//     return request.get(`/search?value=${value}&sort=${sort}&order=${order}&page=${page}&pagesize=${pagesize}`)
// }


// 搜索
export function fetchSearch(data) {
    // 将对象转化成查询字符串 方法二
    let queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    return request.get(`/search?${queryString}`)
}