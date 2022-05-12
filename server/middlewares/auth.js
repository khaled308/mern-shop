const ExpressError = require("../utils/ExpressError")
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.isAuth = async(req,res,next)=>{
    const token = req.headers.auth
    if(!token) return next(new ExpressError('access denied',403))
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
            if(err) return next(new ExpressError('access denied',403))
            req.user = data
        })
        next()
    }
}
exports.isAuthAndAdmin = async(req,res,next)=>{
    this.isAuth(req,res,async()=>{
        const {_id }= req.user
        const user = await User.findOne({_id})
        if(user && user.role) next()
        else next(new ExpressError('access denied' , 403))
    })
}