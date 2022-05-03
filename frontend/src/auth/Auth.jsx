import { isAuthApi } from "../util/api"
import { useContext, useEffect} from "react"
import UserContext from "../util/UserContext"
import {useNavigate } from "react-router-dom"

function Auth({children}) {
    const [user ,setUser ] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user.name){
            isAuthApi()
            .then(res=>{
                const {isAuth , data} = res.data
                if(isAuth){
                    setUser(data)
                }
                else navigate('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[])
    return children
}

export default Auth