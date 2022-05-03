import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../util/UserContext"

function Admin({children}) {
    const user = useContext(UserContext)[0]
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user.role)navigate('/user/dashboard')
    },[])

    return children
}

export default Admin