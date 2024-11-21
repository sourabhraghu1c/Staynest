const Joi = require('joi');

module.exports. rentalSchema = Joi.object({
    rental: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.object({
            state: Joi.string().required(),
            pincode: Joi.string().required(),
            address: Joi.string().required(),
        }).required(),
        price: Joi.number().required().min(0 ),
        propertyType: Joi.string().required(),
        facilities: Joi.string().allow('').optional(),
        photos: Joi.string().required(),
        contact: Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().allow('').optional(),
        }).required(),
    }).required(),
});

