import express from "express";
import pino from "pino-http";
import cors from 'cors';

import contactsRouter from "./routers/contacts.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";



export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use("/contacts", contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

const port = Number(getEnvVar("Port", 3000));

    app.listen(port, () => {
        console.log(`"Server is running on port ${port}"`);
    });
};
