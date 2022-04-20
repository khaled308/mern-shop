const router = require('express').Router()
const {register , login , logout } = require('../controllers/auth.controller')
const {verifyToken} = require('../middlewares/verify_token')
const { registerValidate , loginValidate } = require('../middlewares/data_validate')

router.post('/signup',registerValidate,register)
router.post('/login',loginValidate,login)
router.get('/logout',logout)

router.get('/post',verifyToken,(req,res)=>{
    res.send('hi')
})

module.exports = router