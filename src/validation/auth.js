import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

export const authRegisterSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a string',
        'any.required': 'Name is required',
    }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email should be a valid email address',
  }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
  }),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Email should be a valid email address',
  }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
  }),
});
