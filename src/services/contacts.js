import ContactCollection from "../db/models/Contact.js";

import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {},}) => {
    const limit = perPage;
    const skip = (page - 1) * limit;

    const contactsQuery = ContactCollection.find();
    if (filter.contactType) {
        contactsQuery.where("contactType").equals(filter.contactType);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }
    if (filter.userId) {
        contactsQuery.where("userId").equals(filter.userId);
    };

    const totalItems = await ContactCollection.find().merge(contactsQuery).countDocuments();
    const data = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder});

    const paginationData = calcPaginationData({ page, perPage, totalItems });

    return {
        data,
        ...paginationData,
    };
};

export const getContactById = contactId => ContactCollection.findById(contactId);

export const getContact = filter => ContactCollection.findOne(filter);

export const addContact = payload => ContactCollection.create(payload);

export const patchContact = async (filter, payload, options = {}) => {
    const result = await ContactCollection.findOneAndUpdate(filter, payload, {
        ...options,
        includeResultMetadata: true,
    });

    if (!result || !result.value) return null;

    const isNew = Boolean(result.lastErrorObject.upserted);

    return {
        isNew,
        data: result.value,
    };
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
};
