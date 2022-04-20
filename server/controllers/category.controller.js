const Category = require('../models/category.model')
const ExpressError = require('../utils/ExpressError')

exports.getProducts = (req,res)=>{

}

exports.getProduct = (req,res)=>{

}

exports.createCategory = async(req,res,next)=>{
    try{
        const category = new Category(req.body)
        await category.save()
        res.json({message: 'ok'})
    }
    catch(err){
        next(new ExpressError(err.message , 401))
    }
}

