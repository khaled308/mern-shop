const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true,
        required : [true, 'name is required' ],
        maxlength : 30
    },
    email : {
        type : String ,
        trim : true,
        required : [true, 'email is required' ],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'password is required' ]
    },
    role : {
        type : Number,
        default : 0
    },
    history : {
        type : Array,
        default : []
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User