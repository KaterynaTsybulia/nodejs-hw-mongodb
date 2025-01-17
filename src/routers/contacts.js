import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

import * as contactsController from "../controllers/contacts.js";


const contactsRouter = Router();

contactsRouter.get("/contacts", ctrlWrapper(contactsController.getContactsController));

contactsRouter.get("/contacts/:contactId", isValidId, ctrlWrapper(contactsController.getContactsByIdController));

contactsRouter.post("/contacts", validateBody(contactAddSchema), ctrlWrapper(contactsController.addContactsController));

contactsRouter.patch("/contacts/:contactId", isValidId, validateBody(contactUpdateSchema),ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete("/contacts/:contactId", isValidId, ctrlWrapper(contactsController.deleteContactController));


export default contactsRouter;
