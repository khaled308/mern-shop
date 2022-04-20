const User = require("../models/user.model")
const ExpressError = require("../utils/ExpressError")

exports.isAdmin = async(req,res,next)=>{
    const id = req.id
    const user = await User.findOne({_id : id})
    if(user && user.role) next()
    else next(new ExpressError('access denied' , 403))
}