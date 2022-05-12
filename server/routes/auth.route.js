const router = require('express').Router()
const {register , login ,  Home, getUserDashboard } = require('../controllers/auth.controller')
const { registerValidate , loginValidate } = require('../middlewares/data_validate')
const { isAuth } = require('../middlewares/auth')

router.post('/signup',registerValidate,register)
router.post('/login',loginValidate,login)
router.get('/',Home)
router.get('/dashboard',isAuth,getUserDashboard)

module.exports = router