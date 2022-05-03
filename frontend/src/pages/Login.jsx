import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { loginApi } from "../util/api";
import UserContext from "../util/UserContext";
function Login() {
    const setUser = useContext(UserContext)[1]
    const navigate = useNavigate()
    const [error,setError] = useState('')
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
        loginApi(values)
        .then(res=>{
            const {err , data} = res.data
            if(err){
                setError(err)
            }
            else{
                const {token , role} = data
                localStorage.setItem('token',token)
                setUser(data)
                if(role) navigate('/admin/dashboard')
                else navigate('/user/dashboard')
            }
        })
        .catch(err=>{
            console.log(err)
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