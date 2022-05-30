import request from './request.js'
// 登录
export function fetchlogin(username, password) {
    return request.post('/login', { username, password })
}
// 注册
export function fetchRegister(formData) {
    return request.post('/register', formData)
}
// 上传头像
export function fetchUpload(formData) {
    return request.post('/upload', formData)
}

// 添加地址
export function fetchAddaddress(user_id, data) {
    return request.post(`/addaddress/${user_id}`, data)
}
// 获取用户地址
export function fetchGetaddress(user_id) {
    return request.get(`/getaddress/${user_id}`)
}
// 删除用户地址
export function fetchDeladdress(address_id) {
    return request.post(`/deladdress/${address_id}`)
}

// 编辑用户地址
export function fetchUpdateaddress(address_id, data) {
    return request.post(`/updateaddress/${address_id}`, data)
}