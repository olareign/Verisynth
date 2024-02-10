import Joi from "joi"

export default {
    verify_institution: Joi.object({
        institution_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(30).required(),
        confirmPassword: Joi.ref('password')
    }),
}