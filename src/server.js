import express from "express";
import pino from "pino-http";
import cors from 'cors';
import cookieParser from "cookie-parser";

import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";
import { UPLOADS_DIR } from "./constants/index.js";



export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.static("uploads"));

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(cookieParser());


    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);
    app.use('/uploads', express.static(UPLOADS_DIR));
    app.use("/api-docs", swaggerDocs());

    app.use(notFoundHandler);

    app.use(errorHandler);

const port = Number(getEnvVar("Port", 3000));

    app.listen(port, () => {
        console.log(`"Server is running on port ${port}"`);
    });
};
