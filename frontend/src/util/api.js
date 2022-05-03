import axios from "axios";

const url = process.env.REACT_APP_API
const auth = localStorage.getItem('token')

export  const categoriesApi = ()=>{
    return axios.get(url + '/category')
}

export const productsApi = (query = '')=>{
    return axios.get(url + '/product' + query)
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

export const isAdmin = ()=>{
    return axios.get(url + '/user/admin',{
        headers : {
            auth : localStorage.getItem('token')
        }
    })
}

export const loginApi = (data)=>{
    return axios.post(url + '/user/login', data)
}

export const signupApi = (data)=>{
    return axios.post(url + '/user/signup', data)
}
