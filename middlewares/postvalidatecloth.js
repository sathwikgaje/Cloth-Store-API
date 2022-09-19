const joi = require('joi')

function postvalidateCloth(cloth){
    const schema = joi.object({
        name:joi.string().min(3).required(),
        price:joi.number().required(),
        description:joi.string(),
        type:joi.string().min(3).required()
    })
    const result = schema.validate(cloth)
    return result.error
}

module.exports = postvalidateCloth