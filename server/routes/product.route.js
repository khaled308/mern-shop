const router = require('express').Router()
const upload = require('../middlewares/file_upload')
const {createProduct, getProduct, deleteProduct, updateProduct, getAllProducts} = require('../controllers/product.controller')
const { isAuth, isAuthAndAdmin } = require('../middlewares/auth')
const { productValidate, isProductExist } = require('../middlewares/product')

router.get('/',getAllProducts)
router.post('/create',isAuthAndAdmin,upload,productValidate,createProduct)
router.get('/:id',isProductExist,getProduct)
router.delete('/:id',isAuthAndAdmin,isProductExist,deleteProduct)
router.put('/:id',isAuth,isProductExist,isProductExist,upload,updateProduct)

module.exports = router
