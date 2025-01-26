import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { SMTP } from '../constants/index.js';
import createError from 'http-errors';

const transporter = nodemailer.createTransport({
    host: getEnvVar(SMTP.SMTP_HOST),
    port: getEnvVar(SMTP.SMTP_PORT),
    auth: {
        user: getEnvVar(SMTP.SMTP_USER),
        pass: getEnvVar(SMTP.SMTP_PASSWORD),
    },
});

export const sendEmail = async options => {
    try {
        await transporter.sendMail(options);
    } catch {
        throw createError(500, 'Failed to send the email, please try again later.');
    }
};
