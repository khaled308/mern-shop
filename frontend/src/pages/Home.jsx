import { useContext, useEffect, useState } from "react"
import { isAuthApi, productsApi } from "../util/api"
import UserContext from "../util/UserContext"

function Home() {
    const setUser = useContext(UserContext)[1]
    const [products , setProducts] = useState([])
    console.log(products)
    useEffect(()=>{
        isAuthApi()
        .then(res=>{
            const {isAuth , data} = res.data
            if(isAuth){
                setUser(data)
            }
        })
        .catch(err=>{
            console.log(err)
        })

        productsApi()
        .then(res=>{
            const {data} = res.data
            setProducts(data)
        })
    },[])
    return (
        <div>Home</div>
    )
}

export default Home