import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }
    },[])
    const initialValues = {
        name : '',
        email : '',
        password : ''
    }
    const [values,setValues] = useState(initialValues)

    const handelChange = (e)=>{
        setValues({...values,[e.target.name] : e.target.value})
    }

    const submit = (e)=>{
        e.preventDefault()
        const url = process.env.REACT_APP_API + '/user/signup'
        axios.post(url,values)
        .then(res=>{
            const {err , message} = res.data
            if(err){
                setError(err)
            }
            else{
                setSuccess(message)
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
                {success ? <div className="alert alert-success text-center col col-sm-12 col-md-6 mx-auto" role="alert">{success}</div> : ''}
            </div>

            <div className="row mx-0">
                <form className="col col-sm-12 col-md-6 mx-auto py-5">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={values.name} onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={values.email} onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={values.password} onChange={handelChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup