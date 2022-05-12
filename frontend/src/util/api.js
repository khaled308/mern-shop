import axios from "axios";

const url = process.env.REACT_APP_API
const auth = localStorage.getItem('token')

export  const categoriesApi = ()=>{
    return axios.get(url + '/category')
}

export const createCategoryApi = (data)=>{
    return axios.post(url + '/category/create', data,{
        headers : {
            auth
        }
    })
}

export const productsApi = (query = '')=>{
    return axios.get(url + '/product' + query)
}

export const createProductApi = (data)=>{
    return axios.post(url + '/product/create', data,{
        headers : {
            auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const isAuthApi = ()=>{
    return axios.get(url +'/user',{
        headers : {
            auth
        }
    })
}

export const dashboardApi = ()=>{
    return axios.get(url + '/user/dashboard',{
        headers : {
            auth 
        }
    })
}



export const loginApi = (data)=>{
    return axios.post(url + '/user/login', data)
}

export const signupApi = (data)=>{
    return axios.post(url + '/user/signup', data)
}
