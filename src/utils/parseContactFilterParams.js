import { typeList } from "../constants/contact.js";


const parseContactType = contactType => {
    if (typeof contactType !== "string") return null;

    return typeList.includes(contactType) ? contactType : null;
};

const parseIsFavourite = isFavourite => {
    if (typeof isFavourite === "string") {
        const value = isFavourite.toLowerCase();
        return value === "true" ? true : value === "false" ? false : null;
    };
    return null;
};

export const parseContactFilterParams = ({ contactType, isFavourite }) => {
    const parsedType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedIsFavourite,
    };
};

