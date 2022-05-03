import React, { useEffect, useState } from 'react'
import {categoriesApi, productsApi} from '../util/api.js' 
import { priceRange } from '../util/price.js'
import Products from './Products.jsx'
function Shop() {
    const [categories,setCategories] = useState([])
    const [checkedCategories,setCheckedCategories] = useState([])
    const [selectedPrice , setSelectedPrice] = useState('')
    const [query,setQuery] = useState('')
    const [products, setProducts] = useState([])

    useEffect(()=>{
        setQuery(`price=${selectedPrice}&category=${checkedCategories.join(',')}`)

        // productsApi('?' + query)
        // .then(res=>{
        //     const {data} = res.data
        //     setProducts(data)
        // })
        
    },[checkedCategories , selectedPrice , query ])

    categoriesApi.then(res=>{
        const {data}= res.data
        setCategories(data)
    })
    const selectCategory = (e)=>{
        if(e.target.checked) setCheckedCategories([...checkedCategories,e.target.value])
        
        else{
            const selected = checkedCategories.filter(item=>item !== e.target.value )
            setCheckedCategories(selected)
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="right col-md-3">
                    <div className="top mb-5">
                        <h2>Filter by categories</h2>
                        {
                            categories.map(item=>{
                                return(
                                    <div className="form-check" key={item._id}>
                                        <input type='checkbox' id={item._id}  className="form-check-input" value={item.name} name='category' onClick={selectCategory}/>
                                        <label htmlFor={item._id} className="form-check-label">{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="bottom">
                        <h2>Filter by price</h2>
                        {
                            priceRange.map(item=>{
                                return(
                                    <div className="form-check" key={item.id}>
                                        <input type='radio' id={item.id}  className="form-check-input" value={item.name} name='price' onClick={(e)=>setSelectedPrice(e.target.value.replace(/[$,' ']/g,''))}/>
                                        <label htmlFor={item.id} className="form-check-label">{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="left col-md-9">
                        <Products products={products}/>
                </div>
            </div>
        </div>
    )
}

export default Shop