const Product = require('../models/product.model')
const ExpressError = require('../utils/ExpressError')
const fs = require('fs')

exports.getAllProducts = async(req,res,next)=>{
    const categories = req.query.category && req.query.category.split(',')
    const price = req.query.price && req.query.price.split(',')
    const categoryCondition = categories ? {category : {$in : categories}} : {}
    const priceCondition = price ? {price : {$gt : +price[0] - 1 , $lt: +price[1] + 1}} : {}
    try{
        const products =  await Product.find({ ...categoryCondition ,...priceCondition})
        res.json({data: products})
    }
    catch(err){
        next(new ExpressError(err.message,500))
    }
}

exports.createProduct = async(req,res)=>{
    try{
        const categoryId = req.category._id
        const product = new Product({...req.body , category : categoryId , productImg : req.file.path})
        await product.save()
        res.json({message : 'ok'})
    }
    catch(err){
        next(new ExpressError(err.message,404))
    }
}

exports.getProduct = async(req,res,next)=>{
    res.send(req.product)
}

exports.deleteProduct = async(req,res,next)=>{
    try{
        fs.unlinkSync(req.product.productImg)
        await Product.deleteOne({_id : req.params.id})
        res.json({message : 'ok'})
    }
    catch(err){
        next(new ExpressError(err.message,404))
    }
}

exports.updateProduct = async(req,res,next)=>{
    try{
        if(req.file){
            fs.unlinkSync(req.product.productImg)
        }
        const product = req.product._doc
        await Product.updateOne({_id : product._id},{...product,...req.body})
        res.json({message : 'ok'})
    }
    catch(err){
        next(err.message,400)
    }
}