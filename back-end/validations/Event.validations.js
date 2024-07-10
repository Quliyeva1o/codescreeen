const Joi =require('joi');

const EventSchemaValidation=Joi.object({
    title:Joi.string().required(),
    img:Joi.string().uri(),
    coverImg:Joi.string().uri(),
    movies:Joi.string(),
    description:Joi.string().required(),
})

module.exports=EventSchemaValidation
