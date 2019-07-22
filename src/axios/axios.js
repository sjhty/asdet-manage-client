import axios from 'axios'
import { message } from 'antd'

axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}

export default function request( url, data = {}, method) {
    return new Promise((resolve,reject) => {
        let promise;
        if (method === 'GET') {
            promise = axios.get( url, {
                params: data
            })
        } else {
            promise = axios.post( url, data)
        }

        promise.then( response => {
            //console.log("response",response)
            resolve( response.data )
        }).catch( error => {
            message.error( "请求出错了" + error.message )
        })
    })
}