import Joi from "joi";
import { typeList } from "../constants/contact.js";


export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'PhoneNumber should be a string',
    'string.min': 'PhoneNumber should have at least {#limit} characters',
    'string.max': 'PhoneNumber should have at most {#limit} characters',
    'any.required': 'PhoneNumber is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email should be a valid email address',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'IsFavourite should be a boolean value',
  }),
  contactType: Joi.string().valid(...typeList).required().messages({
    'any.only': `Contact type should be one of [${typeList.join(', ')}]`,
    'any.required': 'Contact type is required',
  }),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'PhoneNumber should be a string',
        'string.min': 'PhoneNumber should have at least {#limit} characters',
        'string.max': 'PhoneNumber should have at most {#limit} characters',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email should be a valid email address',
    }),
    isFavourite: Joi.boolean().optional().messages({
        'boolean.base': 'IsFavourite should be a boolean value',
    }),
    contactType: Joi.string().valid(...typeList).messages({
        'any.only': `Contact type should be one of [${typeList.join(', ')}]`,
    }),
});
