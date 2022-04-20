const Joi = require('joi');

const productValidation = (data)=>{
    let err = ''
    const schema = Joi.object({
            name : Joi.string().required().alphanum().max(30).min(3),
            description : Joi.string().required().max(2000),
            price : Joi.number().min(0).max(1000000),
            quantity : Joi.number().min(0).required(),
            category : Joi.string().required()
        })
        const {error} = schema.validate(data)

        if(error)
            err = error.details.map(item=>item.message).join(' , ')
        return err    
}

module.exports = productValidation