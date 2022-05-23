import request from './request.js'
export function fetchcarDataId(id) {
    return request.get(`http://api.w0824.com/api/getshopcarlist/${id}`)
}