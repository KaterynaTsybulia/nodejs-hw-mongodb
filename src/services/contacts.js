import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = contactId => ContactCollection.findById(contactId);

export const addContact = payload => ContactCollection.create(payload);

export const patchContact = async (contactId, payload, options = {}) => {
    const result = await ContactCollection.findOneAndUpdate({ _id: contactId }, payload, {
        new: true,
        ...options,
        includeResultMetadata:true,
    });

    if (!result || !result.value) return null;

    const isNew = Boolean(result.lastErrorObject.upserted);

    return {
        isNew,
        data: result.value,
    };
};

export const deleteContact = async (contactId) => {
    const contact = await ContactCollection.findOneAndDelete({ _id: contactId });
    return contact;
};
