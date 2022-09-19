const joi = require('joi')

function validateUser(user){
    const schema = joi.object({
        name:joi.string().min(3).required(),
        email:joi.string().email().required(),
        phone:joi.number().min(10).required(),
        password:joi.string().min(8).max(255).required()
    })
    const validate = schema.validate(user)
    return validate
}

module.exports = validateUser