const Product = require('../models/product.model')
const ExpressError = require('../utils/ExpressError')
const fs = require('fs')

exports.getAllProducts = async(req,res)=>{
    try{
        const products =  await Product.find()
        res.json({data: products})
    }
    catch(err){
        next(new ExpressError(err.message,500))
    }
}

exports.createProduct = (req,res)=>{
    res.json({message : 'ok'})
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