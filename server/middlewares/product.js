const fs = require('fs')
const productValidation = require('../utils/validate_product')
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const ExpressError = require('../utils/ExpressError')

exports.productValidate = async(req,res,next)=>{
    if(!req.file) return res.json({err : 'file should be image'})
    
    const validateMessage = productValidation(req.body)
    if(validateMessage){
        fs.unlinkSync('uploads/' + req.file.filename)
        return res.json({err : validateMessage})
    }

    else{
        try{
            const category = await Category.findOne({name : req.body.category})
            if(category){
                req.category = category
                next()
            }
            else{
                fs.unlinkSync('uploads/' + req.file.filename)
                next(new ExpressError('category not exist',400))
            }
        }
        catch(err){
            fs.unlinkSync('uploads/' + req.file.filename)
            next(new ExpressError(err.message,400))
        }
    }
}

exports.isProductExist = async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product) return next(new ExpressError("product doesn't exist",404))
        req.product = product
        next()
    }
    catch(err){
        next(new ExpressError("product doesn't exist",404))
    }
}