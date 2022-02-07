import axios from 'axios';
import { Modal } from 'antd';

export const setAuthToken = (token) => {
    return localStorage.setItem("token", token)
}

export const getAuthToken = () => {
    return String(localStorage.getItem("token"));
}

function confirmWarning(warningTitle, warningContent) {
    Modal.warning({
        title: warningTitle,
        content: warningContent
    })
}

const instance = axios.create({
    baseURL:'http://localhost:8080/',
    headers:{
        'X-Powered-By':'Express',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
    },
    timeout:20000,
})
const imgInstance = axios.create({
    baseURL:'http://localhost:8080/',
    headers: {
        'X-Powered-By':'Express',
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin':'*',
    },
    timeout:20000,
})
const userInstance = axios.create({
    baseURL:'http://localhost:8080/',
    headers: {
        'X-Powered-By':'Express',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    },
    timeout:20000,
})
const a=axios.create({

    baseURL:'http://localhost:8080',
    // baseURL:'http://192.168.123.127:3000',

    //配置请求超时时间
    timeout: 5000
})
export function reqUploadImg(file) {
    return a({
      url: '/stores',
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: file,
    //   params: {<!-- --> user_id }
    })
  }
instance.interceptors.request.use(
    function(config){

        return config;
    },
    function(error) {
        console.log('request error');
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function(response) {
        return response;
    },
    function (error) {
        if(error.response) {
            switch (error.response.status) {
                case 404:
                    console.log('頁面不存在')
                    break
                case 500:
                    console.log('程式發生問題')
                    break
                default:
                    console.log('other error')
            }
        }
        return Promise.reject(error);
    }
)
userInstance.interceptors.response.use(
    function(response) {
        return response;
    },
    function (error) {
        if(error.response) {
            switch (error.response.status) {
                case 404:
                    console.log('頁面不存在')
                    break
                case 500:
                    console.log('程式發生問題')
                    break
                
                default:
                    console.log('other error')
            }
            switch (error.response.data.status) {
                case 1:
                    console.log('Some fields are empty.')
                    break
                case 2:
                    console.log('Password do not match.')
                    confirmWarning(
                        'Confirm Password 輸入錯誤',
                        'Confirm Password 欄位內容需要與 Password 欄位相同'
                    );
                    break
                case 3:
                    console.log('The nickname already exists.')
                    confirmWarning(
                        '此 Nickname 已被使用過',
                        '換一個 Nickname 吧！'
                    );
                    break
                case 4:
                    console.log('The username already exists.')
                    confirmWarning(
                        '此 Username 已被使用過',
                        '換一個 username 吧！'
                    );
                    break
                case 5:
                    console.log("The username/nickname is not available.")
                    confirmWarning(
                        '未註冊過此帳號',
                        '前往 Signup 頁面進行註冊吧'
                    );
                    break
                case 6:
                    console.log("Wrong password.")
                    confirmWarning(
                        '密碼錯誤',
                        '此帳號的密碼不是這一個'
                    );
                    break
                default:
                    console.log('other status error')
            }
        }
        return Promise.reject(error);
    }
)

export const getStores = data => instance.get('/stores', data);
export const getFoodsStores = data => instance.get('/stores/Foods', data);
export const getDrinksStores = data => instance.get('/stores/Drinks', data);
export const postStore = data => imgInstance.post('/stores', data);
export const postCart = data => instance.post('/carts', data);
export const getCarts = data => instance.get('/carts/drawer', data);
// export const postMenu = data => imgInstance.post('/images', data);
export const getAStore = (id, data) => instance.get(`/store/${id}`, data);
export const postEditedStore = (data, id) => instance.post(`/store/${id}`, data);
export const deleteAStore = (id, data) => instance.delete(`/store/${id}`, data);
export const getUsingUser = data => instance.get('/bill/user', data);
export const postRegister = data => userInstance.post('/register', data);
export const postLogin = data => userInstance.post('/login', data);
// export const postMenu = (data, id) => {
//     return instance.post(`/images/${id}`, data);
// }
