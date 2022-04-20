const jwt = require('jsonwebtoken');
const ExpressError = require('../utils/ExpressError');

exports.verifyToken = (req,res,next)=>{
    const token = req.cookies.id
    if(!token) next(new ExpressError('access denied',403))

    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.id = verified.id
        next()
    }
    catch(err){
        next(new ExpressError('access denied',403))
    }
}