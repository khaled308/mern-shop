const Joi = require('joi');

const registerValidation = (data)=>{
    let err = ''
    const schema = Joi.object({
            name : Joi.string().required().alphanum().max(30).min(3),
            email : Joi.string().email(),
            password : Joi.string().required().min(6)
        })
        const {error} = schema.validate(data)

        if(error)
            err = error.details.map(item=>item.message).join(' , ')
        return err    
}

module.exports = registerValidation