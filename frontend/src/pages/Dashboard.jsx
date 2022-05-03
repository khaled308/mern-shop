import { useContext } from "react"
import UserContext from '../util/UserContext'
import AdminLink from '../components/AdminLink'
import UserLink from '../components/UserLink'

function Dashboard() {
    const user = useContext(UserContext)[0]
    return (
        <>
            <div className="container">
                <div className="row">
                    {user.role ? <AdminLink /> : <UserLink />}
                    <div className="col col-sm-12 col-md-8">
                        <div className="card mb-5">
                        <h5 className="card-header">User Information</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{user.name}</li>
                            <li className="list-group-item">{user.email}</li>
                            <li className="list-group-item">{user.role ? 'admin': 'user'}</li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="card mb-5">
                    <h5 className="card-header">Purchase History</h5>
                    <ul className="list-group list-group-flush">
                        {
                            <li className="list-group-item">history</li>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Dashboard