import Joi from "joi"

export default {
    verify_institution: Joi.object({
        institution_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,30}$/)).required(),
        confirmPassword: Joi.ref('newPassword')
    }),
}