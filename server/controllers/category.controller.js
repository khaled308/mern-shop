const Category = require('../models/category.model')
const ExpressError = require('../utils/ExpressError')


exports.createCategory = async(req,res,next)=>{
    const found = await Category.findOne(req.body)
    if(found) return res.json({err : 'category already exist'})
    try{
        const category = new Category(req.body)
        await category.save()
        res.json({message : 'created successfully'})
    }
    catch(err){
        next(new ExpressError(err.message , 401))
    }
}

exports.updateCategory = ()=>{

}

exports.getAllCategories = async(req,res,next)=>{
    try{
        const categories = await Category.find()
        res.json({data: categories})
    }
    catch(err){
        next(new ExpressError(err.message , 500))
    }
}