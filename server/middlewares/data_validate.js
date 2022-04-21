const registerValidation = require('../utils/validate_register')
const loginValidation = require('../utils/validate_login')
const ExpressError = require('../utils/ExpressError')

exports.registerValidate = (req,res,next)=>{
    const validateMessage = registerValidation(req.body)
    if(validateMessage)  res.json({err : validateMessage})
    else next()
}

exports.loginValidate = (req,res,next)=>{
    const validateMessage = loginValidation(req.body)
    if(validateMessage) res.json({err : validateMessage})
    else next()
}