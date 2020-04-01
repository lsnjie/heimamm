// 用来封装请求注册接口的文件
// 导入aios
import axios from 'axios'

// 导入一个方法: 得到验证码的方法
export function apiGetcode({code, phone}) {
    // 将网络的请求结果返回给外面
   return axios({
            url: process.env.VUE_APP_ONLINEURL + "/sendsms",
            method: "POST",
            data: {
                code:code,
                phone: phone
            },
            // 即跨域必须携带 cookie
            withCredentials: true
        })
}