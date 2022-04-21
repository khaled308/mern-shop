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
        res.json({message : 'new account is created, please login'})
    }).catch(err=>{
        const mongoMsg = new MongoError(err).errorMsg
        res.json({err:mongoMsg})
    })
}

exports.login = async(req,res)=>{
    const {email , password} = req.body
        let user = await User.findOne({email})
        if(!user) res.json({err : 'user not exist'})
        bcrypt.compare(password,user.password).then(result=>{
            if(!result) res.json({err : 'password is not correct'})
            else{
                user = user.toObject()
                delete user.password
                const token = jwt.sign(user,process.env.JWT_SECRET , {expiresIn : '1d'})
                const data = {...user,token}
                res.json({data})
            }
    })
}

exports.logout = (req,res)=>{
    res.json({message : 'ok'})
}

exports.Home = (req,res)=>{
    const token = req.headers.auth
    if(!token) return res.json({isAuth : false})
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        return res.json({isAuth : true,data:verified})
    }
    catch(err){
        return res.json({isAuth : false})
    }
}

exports.getUserDashboard = (req,res)=>{
    res.json({data : req.user})
}