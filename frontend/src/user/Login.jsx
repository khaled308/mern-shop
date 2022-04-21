import { useContext, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import userContext from "./UserContext";
function Login() {
    const setUser = useContext(userContext)[1]
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const initialValues = {
        email : '',
        password : ''
    }
    const [values,setValues] = useState(initialValues)

    const handelChange = (e)=>{
        setValues({...values,[e.target.name] : e.target.value})
    }


    const submit = (e)=>{
        e.preventDefault()
        const url = process.env.REACT_APP_API + '/user/login'
        axios.post(url,values)
        .then(res=>{
            const {err , data} = res.data
            if(err){
                setError(err)
            }
            else{
                navigate('/')
                localStorage.setItem('token',data.token)
                setUser(data)
            }
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    return (
        <>
            <div className="row mx-0">
                {error ? <div className="alert alert-danger text-center col col-sm-12 col-md-6 mx-auto" role="alert">{error}</div> : ''}
            </div>

            <div className="row mx-0">
                <form className="col col-sm-12 col-md-6 mx-auto py-5">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={values.email} onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={values.password} onChange={handelChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submit}>Login</button>
                </form>
            </div>
        </>
    )    
}

export default Login