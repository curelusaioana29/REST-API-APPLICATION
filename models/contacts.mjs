import Contact from "./contact.mjs";

const listContacts = async (ownerId) => {
  return await Contact.find({ owner: ownerId });
};

const getContactById = async (contactId, ownerId) => {
  return await Contact.findOne({ _id: contactId, owner: ownerId });
};

const removeContact = async (contactId, ownerId) => {
  return await Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
};

const addContact = async ({ name, email, phone, favorite, owner }) => {
  const newContact = new Contact({ name, email, phone, favorite, owner });

  return await newContact.save();
};

const updateContact = async (contactId, ownerId, { name, email, phone }) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { name, email, phone },
    { new: true }
  );
};

const updateStatusContact = async (contactId, ownerId, favorite) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { favorite },
    { new: true }
  );
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
