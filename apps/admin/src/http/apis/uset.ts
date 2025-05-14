import request from '../request'

const authLogin = (data: any) => {
    request(url:'/auth/login', {auth:false})
}