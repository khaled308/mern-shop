import { useEffect, useState , useContext } from 'react'
import UserContext from "../util/UserContext"
import {categoriesApi, productsApi, isAuthApi} from '../util/api.js' 
import { priceRange } from '../util/price.js'
import Product from '../components/Product'
function Shop() {
    const [user ,setUser ] = useContext(UserContext)
    const [categories,setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategories , setSelectedCategories] = useState([])
    const [selectedPrice , setSelectedPrice] = useState([])
    const [query , setQuery] = useState('')

    const handelCheckbox = (e)=>{
        if(e.target.checked) setSelectedCategories([...selectedCategories , e.target.value])
        else{
            const selected = selectedCategories.filter(category=>category !== e.target.value)
            setSelectedCategories(selected)
        }
    }

    const handelRadioButton = (e)=>{
        const price = priceRange.find(item=>item.name === e.target.value)
        setSelectedPrice(price.range)
    }

        useEffect(()=>{
        if(!user.name){
            isAuthApi()
            .then(res=>{
                const {isAuth , data} = res.data
                if(isAuth){
                    setUser(data)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[])

    useEffect(()=>{
        const selectedCategoriesId = categories.filter(item=> selectedCategories.some(selected=>selected === item.name)).map(cat=>cat._id)
        setQuery(`?price=${selectedPrice}&category=${selectedCategoriesId}`)
    },[selectedCategories , selectedPrice])

    useEffect(()=>{
        productsApi(query)
        .then(res=>{
            const {data} = res.data
            setProducts(data)
        })

        categoriesApi()
        .then(res=>{
            const {data} = res.data
            setCategories(data)
        })
        
    },[query])



    return (
        <div className="container">
            <div className="row">
                <div className="right col-sm-12 col-md-3">
                    <div className="top mb-5">
                        <h2 className='fs-4'>Filter by categories</h2>
                        {
                            categories.map(item=>{
                                return(
                                    <div className="form-check" key={item._id}>
                                        <input type='checkbox' id={item._id}  className="form-check-input" value={item.name} name='category' onClick={handelCheckbox}/>
                                        <label htmlFor={item._id} className="form-check-label">{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="bottom">
                        <h2 className='fs-4'>Filter by price</h2>
                        {
                            priceRange.map(item=>{
                                return(
                                    <div className="form-check" key={item.id}>
                                        <input type='radio' id={item.id}  className="form-check-input" value={item.name} name='price' onClick={handelRadioButton}/>
                                        <label htmlFor={item.id} className="form-check-label">{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="left col-md-9">
                    <div className="container my-5 py-5">
                        <div className="row">
                            {
                                products.map(item=><Product product={item} key={item._id} className='col-md-6 col-xl-4' />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop