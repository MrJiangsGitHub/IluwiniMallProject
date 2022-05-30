import request from './request.js'
export function fetchlunbo() {
    return request.get('/getlunbo')
}

export function fetchgoodslist(page = 1, limit = 10) {
    return request.get(`/recommend?page=${page}&limit=${limit}`)
}