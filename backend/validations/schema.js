const Joi = require('joi');

module.exports.userSignupSchema=Joi.object({
    username: Joi.string().min(4).max(100).required(),
    phonenumber: Joi.string().pattern(/^\d{10}$/).required(),
    password: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().allow("").optional(),
    role: Joi.string().valid("PropertyOwner", "Homeseeker", "admin").required()
});

module.exports.userLoginSchema=Joi.object({
        username: Joi.string().min(4).max(100).required(),
        password: Joi.string().min(4).max(100).required(),
    });

module.exports.reviewSchema= Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        createdAt: Joi.date().default(() => new Date()).optional(),
    }).required()
});

module.exports.rentalSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
        state: Joi.string().required(),
        pincode: Joi.string().pattern(/^\d{6}$/).required(),
        address: Joi.string().required(),
    }).required(),
    price: Joi.number().required().min(0),
    propertyType: Joi.string().required(),
    facilities: Joi.string().allow('').optional(),

    photos: Joi.any().optional(),

    contact: Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        email: Joi.string().email().allow('').optional(),
    }).required(),

    ownerDetails: Joi.object({
        name: Joi.string().when('...addedByHomeseeker', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        phone: Joi.string().pattern(/^\d{10}$/).when('...addedByHomeseeker', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        email: Joi.string().email().allow('').optional(),
    }).optional(),

    addedByHomeseeker: Joi.boolean().default(false),
}).required();


