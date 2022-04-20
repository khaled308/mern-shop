const fs = require('fs')
const productValidation = require('../utils/validate_product')
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const ExpressError = require('../utils/ExpressError')

exports.productValidate = async(req,res,next)=>{
    if(!req.file) return next(new ExpressError('file should be image' , 406))
    
    const validateMessage = productValidation(req.body)
    if(validateMessage){
        next(new ExpressError(validateMessage , 401))
        fs.unlinkSync('uploads/' + req.file.filename)
    }

    else{
        try{
            const category = await Category.findOne({name : req.body.category})
            if(category){
                const categoryId = category._id
                const product = new Product({...req.body , category : categoryId , productImg : req.file.path})
                await product.save()
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