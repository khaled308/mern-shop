import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLink from './AdminLink'
import userContext from './UserContext'
import UserLink from './UserLink'

function Dashboard() {
    const user = useContext(userContext)[0]
    const INITIAL = {name : '' , email : '' , role : '' , history : []}

    const [values,setValues] = useState(INITIAL)
    const auth = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        const url = process.env.REACT_APP_API + '/user/dashboard'
        axios.get(url,{
            headers : {
                auth 
            }
        })
        .then(res=>{
            const {data} = res.data
            setValues(data)
        })
        .catch(err=>{
            navigate('/login')
        })
    },[])
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        user.role ?
                        <AdminLink /> :
                        <UserLink />
                    }
                    <div className="col col-sm-12 col-md-8">
                        <div className="card mb-5">
                        <h5 className="card-header">User Information</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{values.name}</li>
                            <li className="list-group-item">{values.email}</li>
                            <li className="list-group-item">{values.role ? 'admin' : 'user'}</li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="card mb-5">
                    <h5 className="card-header">Purchase History</h5>
                    <ul className="list-group list-group-flush">
                        {
                            values.history.map(item=><li className="list-group-item">{item}</li>)
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Dashboard