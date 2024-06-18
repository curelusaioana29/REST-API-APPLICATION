const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const contacts = await listContacts();

    response.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (request, response, next) => {
  try {
    const contact = await getContactById(request.params.contactId);

    if (contact) response.status(200).json(contact);
    else response.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { name, email, phone, favorite } = request.body;

    if (!name)
      return response
        .status(400)
        .json({ message: "missing required name field" });

    const newContact = await addContact({ name, email, phone, favorite });

    response.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (request, response, next) => {
  try {
    const contact = await removeContact(request.params.contactId);

    if (contact) response.status(200).json({ message: "contact deleted" });
    else response.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (request, response, next) => {
  try {
    const { name, email, phone } = request.body;

    if (!name && !email && !phone)
      return response.status(400).json({ message: "missing fields" });

    const updatedContact = await updateContact(
      request.params.contactId,
      request.body
    );

    if (updatedContact) response.status(200).json(updatedContact);
    else response.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (request, response, next) => {
  try {
    const { favorite } = request.body;

    if (favorite === undefined)
      return response.status(400).json({ message: "missing field favorite" });

    const updatedContact = await updateStatusContact(
      request.params.contactId,
      favorite
    );

    if (updatedContact) response.status(200).json(updatedContact);
    else response.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
