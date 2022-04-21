const jwt = require('jsonwebtoken');
const ExpressError = require('../utils/ExpressError');

exports.verifyToken = (req,res,next)=>{
    const token = req.headers.auth
    if(!token) next(new ExpressError('access denied',403))

    try{
        req.user  = jwt.verify(token,process.env.JWT_SECRET)
        next()
    }
    catch(err){
        next(new ExpressError('access denied',403))
    }
}