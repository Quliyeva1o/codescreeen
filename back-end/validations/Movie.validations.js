const Joi =require('joi');

const MovieSchemaValidation=Joi.object({
    name:Joi.string().required(),
    director:Joi.string().required(),
    bgImg:Joi.string().uri(),
    cast:Joi.string().required(),
    genres:Joi.string(), 
    rating:Joi.string().required(),
    description:Joi.string().required(),
    runTime:Joi.number().required(),
    releaseDate:Joi.string().required(),
    trailers:Joi.array().default([]),
    coverImg:Joi.string().uri(),
    ageRes:Joi.number().required(),
    sessionTimes:Joi.array().default([])
})

module.exports=MovieSchemaValidation
