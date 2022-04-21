import { Link } from "react-router-dom"

function AdminLink() {
    return (
        <div className="col col-sm-12 col-md-4">
            <div className="card mb-5">
            <h5 className="card-header">Admin Links</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <Link to='#'>Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link to='#'>Update Category</Link>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default AdminLink