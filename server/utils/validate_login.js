const Joi = require('joi');

const loginValidation = (data)=>{
    let err = ''
    const schema = Joi.object({
            email : Joi.string().email(),
            password : Joi.string().required()
        })
        const {error} = schema.validate(data)

        if(error)
            err = error.details.map(item=>item.message).join(' , ')
        return err    
}

module.exports = loginValidation