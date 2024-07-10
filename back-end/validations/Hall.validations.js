const Joi =require('joi');

const HallSchemaValidation=Joi.object({
    name:Joi.string().required(),
    location:Joi.string().required(),
    img:Joi.string().uri(),
    coverImg:Joi.string().uri(),
    address:Joi.string().required(),
    parking:Joi.string().required(),
    map:Joi.string().uri().required(),
    phone:Joi.string().required(),
    events:Joi.array().default([]),
    tags:Joi.array()
})

module.exports=HallSchemaValidation
