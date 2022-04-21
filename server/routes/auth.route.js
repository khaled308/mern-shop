const router = require('express').Router()
const {register , login , logout, Home, getUserDashboard } = require('../controllers/auth.controller')
const {verifyToken} = require('../middlewares/verify_token')
const { registerValidate , loginValidate } = require('../middlewares/data_validate')

router.post('/signup',registerValidate,register)
router.post('/login',loginValidate,login)
router.get('/logout',logout)
router.get('/',Home)
router.get('/dashboard',verifyToken,getUserDashboard)

module.exports = router