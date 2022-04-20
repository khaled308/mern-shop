const router = require('express').Router()
const upload = require('../middlewares/file_upload')
const {createProduct, getProduct, deleteProduct, updateProduct} = require('../controllers/product.controller')
const { isAdmin } = require('../middlewares/auth')
const { verifyToken } = require('../middlewares/verify_token')
const { productValidate, isProductExist } = require('../middlewares/product')

router.post('/create',verifyToken,isAdmin,upload,productValidate,createProduct)
router.get('/:id',isProductExist,getProduct)
router.delete('/:id',verifyToken,isAdmin,isProductExist,deleteProduct)
router.put('/:id',verifyToken,isProductExist,isProductExist,upload,updateProduct)

module.exports = router
