import express from "express";
import auth from "../../middleware/auth.mjs";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../../models/contacts.mjs";

const router = express.Router();

router.use(auth);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user._id);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId, req.user._id);

    if (contact) res.status(200).json(contact);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    if (!name)
      return res.status(400).json({ message: "missing required name field" });

    const newContact = await addContact({
      name,
      email,
      phone,
      favorite,
      owner: req.user._id,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId, req.user._id);

    if (contact) res.status(200).json({ message: "contact deleted" });
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone)
      return res.status(400).json({ message: "missing fields" });

    const updatedContact = await updateContact(
      req.params.contactId,
      req.user._id,
      req.body
    );

    if (updatedContact) res.status(200).json(updatedContact);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (favorite === undefined)
      return res.status(400).json({ message: "missing field favorite" });

    const updatedContact = await updateStatusContact(
      req.params.contactId,
      req.user._id,
      favorite
    );

    if (updatedContact) res.status(200).json(updatedContact);
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

export default router;
