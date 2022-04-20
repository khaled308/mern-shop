const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true,
        required : [true, 'name is required' ],
        maxlength : 30
    },
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category