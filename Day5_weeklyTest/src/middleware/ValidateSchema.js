import Joi from 'joi';

export const validateProductSchema = (req, res, next) => {
    const schema = Joi.object({
        productName: Joi.string().required(),
        productPrice: Joi.number().required(),
        productDescription: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
