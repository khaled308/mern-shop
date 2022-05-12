import { useContext} from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../util/UserContext"

function Admin({children}) {
    const user = useContext(UserContext)[0]
    if(user.role === 0) return <Navigate to='/user/dashboard' />
    return children
}

export default Admin