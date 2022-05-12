import { useContext, useEffect, useState } from "react"
import Product from "../components/Product"
import { isAuthApi, productsApi } from "../util/api"
import UserContext from "../util/UserContext"

function Home() {
    const setUser = useContext(UserContext)[1]
    const [products , setProducts] = useState([])
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
        <div className="container my-5 py-5">
            <div className="row">
                {
                    products.map(item=><Product product={item} key={item._id} />)
                }
            </div>
        </div>
    )
}

export default Home