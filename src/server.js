import express from "express";
import pino from "pino-http";
import cors from 'cors';

import * as contactServices from "./services/contacts.js";
import { getEnvVar } from "./utils/getEnvVar.js";



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

    app.get("/contacts", async (req, res) => {
        const data = await contactServices.getContacts();
        res.status(200).json({
                status: 200,
                message: "Successfully found contacts!",
                data,
            });
    });


    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data,
            });
    });


    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found'
        });
    });

const port = Number(getEnvVar("Port", 3000));

    app.listen(port, () => {
        console.log(`"Server is running on port ${port}"`);
    });
};
