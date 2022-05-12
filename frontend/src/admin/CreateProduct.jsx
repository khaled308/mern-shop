import { useContext, useEffect, useRef, useState } from "react"
import Admin from "../auth/Admin"
import Auth from "../auth/Auth"
import { categoriesApi, createProductApi } from "../util/api"
import UserContext from "../util/UserContext"

const Product = ()=>{
    const INITIAL_VALUES = {name : '', description: '', price: '', quantity: '', productImg:'' }
    const[categories , setCategories] = useState([])
    const[values , setValues] = useState(INITIAL_VALUES)
    const [error,setError] = useState('')
    const[success , setSuccess] = useState('')
    const formRef = useRef()
    useEffect(()=>{
        let isMounted = true;
        categoriesApi()
        .then(res=>{
            const {data} = res.data
            if(isMounted) setCategories(data)
        })
        .catch(err=>{
            console.log(err)
        })
        return ()=>isMounted = false
    },[])
    const handelSubmit = (e)=>{
        e.preventDefault()
        const data = new FormData(formRef.current)

        createProductApi(data)
        .then(res=>{
            const {err , message} = res.data
            if(err) setError(err)
            if(message){
                setSuccess(message)
                setValues(INITIAL_VALUES)
            }
            setTimeout(()=>{
                setError('')
                setSuccess('')
            },3000)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <>
            <div className="row mx-0 mt-5">
                {error ? <div className="alert alert-danger text-center col col-sm-12 col-md-6 mx-auto" role="alert">{error}</div> : ''}
                {success ? <div className="alert alert-success text-center col col-sm-12 col-md-6 mx-auto" role="alert">{success}</div> : ''}
            </div>

            <div className="row mx-0 mt-5">
                <h1 className="col-sm-12 text-center">Create Product</h1>
            </div>
            <div className="row mx-0">
                    <form className='col-sm-12 col-md-6 mx-auto py-5' ref={formRef}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id='name' name="name" value={values.name} onChange={(e)=>setValues({...values , [e.target.name] : e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id='price' name="price" value={values.price} onChange={(e)=>setValues({...values , [e.target.name] : e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id='quantity' name="quantity" value={values.quantity} onChange={(e)=>setValues({...values , [e.target.name] : e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select name="category" className="form-control" defaultValue='select category' id="category" >
                                <option disabled value='select category'>Select Category</option>
                                {
                                    categories.map(item=><option value={item.name} key={item._id}>{item.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productImg" className="form-label">Product Img</label>
                            <input className="form-control" type="file" id="productImg" name='productImg' value={values.productImg} onChange={(e)=>setValues({...values , [e.target.name] : e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" placeholder="Product Description" id="description" name="description" value={values.description} onChange={(e)=>setValues({...values , [e.target.name] : e.target.value})}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-5" onClick={handelSubmit}>Create Product</button>
                    </form>
            </div>
        </>
    )
}

function CreateProduct(){
    const user = useContext(UserContext)[0]
    return user.name ? <Product /> :
        <Auth>
            <Admin>
                <Product />
            </Admin>
        </Auth>
    
}

export default CreateProduct