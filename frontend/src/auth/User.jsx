import { useContext} from "react"
import { Navigate} from "react-router-dom"
import UserContext from "../util/UserContext"

function User({children}) {
    const user = useContext(UserContext)[0]
    
    if(user.role === 1) return <Navigate to='/admin/dashboard' />
    return children
}

export default User