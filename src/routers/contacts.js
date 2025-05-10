import { Router } from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import * as contactsController from "../controllers/contacts.js";


const contactsRouter = Router();

contactsRouter.get("/contacts", ctrlWrapper(contactsController.getContactsController));

contactsRouter.get("/contacts/:contactId", ctrlWrapper(contactsController.getContactsByIdController));

contactsRouter.post("/contacts", ctrlWrapper(contactsController.addContactsController));

contactsRouter.patch("/contacts/:contactId", ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete("/contacts/:contactId", ctrlWrapper(contactsController.deleteContactController));


export default contactsRouter;
