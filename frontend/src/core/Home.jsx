import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import userContext from '../user/UserContext'

function Home() {
    const setUser = useContext(userContext)[1]
    const auth = localStorage.getItem('token')
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API +'/user',{
            headers : {
                auth
            }
        })
        .then(res=>{
            const {isAuth ,data} = res.data
            if(isAuth) setUser(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div>Home</div>

    )
}

export default Home