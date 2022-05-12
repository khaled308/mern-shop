import { Link } from "react-router-dom"

function Product({product , className}) {
    return (
        <div className={`col-sm-12 col-md-4 mb-3 ${className}`}>
            <div className="card product">
                <img src={`${process.env.REACT_APP_SERVER}/${product.productImg}`} class="card-img-top" alt="product" />
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <p className="description">{product.description}</p>
                    <p>$ {product.price}</p>
                    <Link to='#' className="btn btn-outline-primary mt-2 mb-2 me-3">view Product</Link>
                    <Link to='#' className="btn btn-outline-primary mt-2 mb-2">Add to Cart</Link>
                </div>
            </div>
        </div>
    )
}

export default Product