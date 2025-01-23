import { Schema, model } from "mongoose";
import { typeList } from "../../constants/contact.js";
import { handleSaveError, setUpdateSetting } from "./hooks.js";


const contactSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        required: true,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        required: true,
        default: "personal",
    }
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
