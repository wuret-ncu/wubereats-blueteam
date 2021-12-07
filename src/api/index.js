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

export const getStores = data => instance.get('/stores', data);
export const getFoodsStores = data => instance.get('/stores/Foods', data);
export const getDrinksStores = data => instance.get('/stores/Drinks', data);
export const postStore = data => instance.post('/stores', data);
export const postCart = data => instance.post('/carts', data);
export const getCarts = data => instance.get('/carts', data);
export const postMenu = data => instance.post('/images', data);
// export const getAStore = data => instance.get('/stores', data); 
 
