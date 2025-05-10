import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contact.js";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        require: true,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        require: true,
        default: "personal",
    },
},
    {
        versionKey:false,
        timestamps: true,
    },
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", setUpdateSetting);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["_id", "name", "phoneNumber", "email", "isFavourite", "contactType" ];

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;
