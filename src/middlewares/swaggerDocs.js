import createError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import {readFileSync} from "node:fs";

import { SWAGGER_PATH } from '../constants/index.js';


export const swaggerDocs = () => {
    try {
        const swaggerDoc = JSON.parse(readFileSync(SWAGGER_PATH, "utf-8"));
        return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
    } catch {
        return (req, res, next) =>
            next(createError(500, "Can't load swagger docs"));
    }
};
