import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from '../util/UserContext'

function Navbar() {
    const [user , setUser] = useContext(UserContext)
    const handelLogout = ()=>{
        setUser({})
        localStorage.removeItem('token')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
            <div className="container">
                <Link className="navbar-brand" to="/">Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${(item)=>item.isActive ? 'active' : ''}`} to={user.role? 'admin/dashboard' : 'user/dashboard'} >Dashboard</NavLink>
                        </li>
                        {
                            !user.name ? 
                            <>
                                <li className="nav-item">
                                        <NavLink className={`nav-link ${(item)=>item.isActive ? 'active' : ''}`} to="/signup">Signup</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${(item)=>item.isActive ? 'active' : ''}`} to="/login">Login</NavLink>
                                </li>
                            </> : 
                            <>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${(item)=>item.isActive ? 'active' : ''}`} to="/login" onClick={handelLogout}>Logout</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar