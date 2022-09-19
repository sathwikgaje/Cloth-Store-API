const joi = require('joi')

function putvalidateCloth(cloth){
    const schema = joi.object({
        name:joi.string().min(3),
        price:joi.number(),
        description:joi.string(),
        type:joi.string().min(3)
    })
    const result = schema.validate(cloth)
    return result.error
}

module.exports = putvalidateCloth