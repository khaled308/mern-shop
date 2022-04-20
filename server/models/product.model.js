const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type : String ,
        trim : true,
        required : [true, 'name is required' ],
        maxlength : 30
    },
    description : {
        type : String ,
        trim : true,
        required : [true, 'name is required' ],
        maxlength : 2000
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true,
    },
    quantity : {
        type : Number
    },
    productImg : {
        type : String,
        required : true
    }
})


const Product = mongoose.model('Product',productSchema)
module.exports = Product