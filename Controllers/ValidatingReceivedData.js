const Joi = require('@hapi/joi')

const complaintValidate = (data) => {
    const schema = Joi.object({
        name:Joi.string().required(),
        cpf:Joi.number().required(),
        district:Joi.string().required(),
        street:Joi.string().required(),
        content:Joi.string().required()
    })

    return schema.validate(data)
} 

module.exports = {complaintValidate}