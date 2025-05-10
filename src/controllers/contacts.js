import createError from "http-errors";

import * as contactServices from "../services/contacts.js";

export const getContactsController = async (req, res) => {
        const data = await contactServices.getContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
};

export const getContactsByIdController = async (req, res) => {
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

    if (!data) {
        throw createError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
};

export const addContactsController = async (req, res) => {
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactServices.patchContact(contactId, req.body);

    if (!result) {
        throw createError(404, "Contact not found");
    };

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactServices.deleteContact({_id: contactId});

    if (!contact) {
        next(createError(404, "Contact not found"));
    return;

    };

    res.status(204).send();
};
