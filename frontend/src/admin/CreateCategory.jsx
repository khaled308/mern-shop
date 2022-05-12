import { useContext, useState } from "react"
import Admin from "../auth/Admin"
import Auth from "../auth/Auth"
import { createCategoryApi } from "../util/api"
import UserContext from "../util/UserContext"

const Category = ()=>{
    const[category , setCategory] = useState({name : ''})
    const [error,setError] = useState('')
    const[success , setSuccess] = useState('')
    const handelSubmit = (e)=>{
        e.preventDefault()
        createCategoryApi(category)
        .then(res=>{
            const {err , message} = res.data
            if(err) setError(err)
            if(message) setSuccess(message)
            setTimeout(()=>{
                setError('')
                setSuccess('')
            },3000)
        })
        .catch(err=>{
            console.log(err)
        })
        setCategory({name: ''})
    }
    return(
        <>
            <div className="row mx-0 mt-5">
                {error ? <div className="alert alert-danger text-center col col-sm-12 col-md-6 mx-auto" role="alert">{error}</div> : ''}
                {success ? <div className="alert alert-success text-center col col-sm-12 col-md-6 mx-auto" role="alert">{success}</div> : ''}
            </div>
            <div className="row mx-0 mt-5">
                <h1 className="col-sm-12 text-center">Create Category</h1>
            </div>
                <div className="row mx-0">
                    <form className='col-sm-12 col-md-6 mx-auto py-5'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id='name'value={category.name} onChange={(e)=>setCategory({name : e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Create Category</button>
                    </form>
            </div>
        </>
    )
}

function CreateCategory() {
    const user = useContext(UserContext)[0]
    return user.name ? <Category /> :
        <Auth>
            <Admin>
                <Category />
            </Admin>
        </Auth>
    
}

export default CreateCategory