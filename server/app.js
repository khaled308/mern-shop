require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/auth.route')
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/product.route')
const ExpressError = require('./utils/ExpressError')

const app = express()

//morgan
app.use(morgan('dev'))

//DB connection
mongoose.connect(process.env.DB).then(()=>console.log('db connected'))

//config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

//routes
app.use('/api/user',userRoute)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)

//not found route
app.all('*',(req,res,next)=>{
    next(new ExpressError('not found',404))
})

//handling error
app.use((err,req,res,next)=>{
    const {message , status} = err
    res.status(status).json({err : message})
})

app.listen(8000)