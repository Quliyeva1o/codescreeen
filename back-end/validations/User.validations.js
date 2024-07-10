const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const UserSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobile: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    postCode: Joi.string().required(),
    gender: Joi.string().valid('female', 'male', 'other').required(),
    preferredCinema: Joi.string().required(),
    receiveOffers: Joi.boolean().required(),
    agreeTerms: Joi.boolean().required(),
});

module.exports = UserSchemaValidation;
