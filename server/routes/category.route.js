const router = require('express').Router()
const {createCategory , getProduct , getProducts} = require('../controllers/category.controller')
const { isAdmin } = require('../middlewares/auth')
const { verifyToken } = require('../middlewares/verify_token')

router.post('/create',verifyToken,isAdmin,createCategory)

module.exports = router