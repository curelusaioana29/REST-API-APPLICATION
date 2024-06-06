const Contact = require("./contact");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const newContact = new Contact({ name, email, phone, favorite });
  return await newContact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
};

const updateStatusContact = async (contactId, favorite) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
