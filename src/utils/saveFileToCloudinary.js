import { v2 as cloudinary } from "cloudinary";
import { unlink } from "node:fs/promises";
import { CLOUDINARY } from '../constants/index.js';

import { getEnvVar } from "./getEnvVar.js";

cloudinary.config({
    secure: getEnvVar(CLOUDINARY.CLOUD_ENABLE),
    cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
    api_key: getEnvVar(CLOUDINARY.API_KEY),
    api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder: "photo"
    });
    await unlink(file.path);
    return response.secure_url;

};
