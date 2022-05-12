const router = require('express').Router()
const {createCategory, getAllCategories} = require('../controllers/category.controller')
const { isAuthAndAdmin } = require('../middlewares/auth')

router.post('/create',isAuthAndAdmin,createCategory)
router.get('/',getAllCategories)

module.exports = router