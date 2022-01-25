import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:8080/',
    headers:{
        'X-Powered-By':'Express',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    },
    timeout:20000,
})
const imgInstance = axios.create({
    baseURL:'http://localhost:8080/',
    headers: {
        'X-Powered-By':'Express',
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin':'*'
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
        }
        return Promise.reject(error);
    }
)

export const getStores = data => instance.get('/stores', data);
export const getFoodsStores = data => instance.get('/stores/Foods', data);
export const getDrinksStores = data => instance.get('/stores/Drinks', data);
export const postStore = data => instance.post('/stores', data);
export const postCart = data => instance.post('/carts', data);
export const getCarts = data => instance.get('/carts/drawer', data);
export const postMenu = data => imgInstance.post('/images', data);
export const getAStore = (id, data) => instance.get(`/store/${id}`, data);
export const postEditedStore = (data, id) => instance.post(`/store/${id}`, data);
export const deleteAStore = (id, data) => instance.delete(`/store/${id}`, data);
export const getUsingUser = data => instance.get('/bill/user', data);
export const postRegister = data => userInstance.post('/register', data);
// export const postMenu = (data, id) => {
//     return instance.post(`/images/${id}`, data);
// }
