const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const ExpressError = require('../utils/ExpressError')
const MongoError = require('../utils/mongoError')
const jwt = require('jsonwebtoken');

exports.register = (req,res,next)=>{
    const {password} = req.body

    bcrypt.hash(password,10).then(async(hash)=>{
        const user = new User({...req.body , password : hash})
        await user.save()
        res.json({message : 'ok'})
    }).catch(err=>{
        const mongoMsg = new MongoError(err).errorMsg
        const errorObject = new ExpressError(mongoMsg,401)
        next(errorObject)
    })
}

exports.login = async(req,res,next)=>{
    try{
        const {email , password} = req.body
        const user = await User.findOne({email})
        bcrypt.compare(password,user.password).then(result=>{
            if(!result) next(new ExpressError('password is not correct',404))
            else{
                const token = jwt.sign({id : user._id},process.env.JWT_SECRET)
                const time = new Date() + 1000 * 60 * 60 * 24 * 2
                const {email , role , name} = user
                res.cookie('id',token,{expire :time})
                res.json({email , role , name} )
            }
        })
    }
    catch(err){
        next(new ExpressError('not found',404))
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('id')
    res.json({message : 'ok'})
}