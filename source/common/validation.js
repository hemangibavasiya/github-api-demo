const Joi = require('@hapi/joi')

const addgitDetailsValidation = (data) => {
    const schema = Joi.object({
        url: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports = {
    addgitDetailsValidation
}
