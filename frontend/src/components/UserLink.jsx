import { Link } from "react-router-dom"

function UserLink() {
    return (
        <div className="col col-sm-12 col-md-4">
            <div className="card mb-5">
            <h5 className="card-header">User Links</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <Link to='#'>My Cart</Link>
                </li>
                <li className="list-group-item">
                    <Link to='#'>Update Profile</Link>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default UserLink