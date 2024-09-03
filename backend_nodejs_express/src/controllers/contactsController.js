const contactsService = require('../services/contactsService');

// Retrieve all documents (array of elements)
exports.getAllContacts = (req, res) => {
    const contacts = contactsService.getAllContacts();
    res.status(200).json({ message: 'OK', data: contacts });
};

// Retreive metadata of documents
exports.getContactsMeta = (req, res) => {
    const meta = contactsService.getContactsMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getContactById = (req, res) => {
    const contactId = parseInt(req.params.id);
    const contact = contactsService.getContactById(contactId);

    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'OK', data: contact });
};

// Search elements by keyword
exports.getContactsByName = (req, res) => {
    const name = req.query.name;
    const contacts = contactsService.getContactByName(name);

    if (!contacts.length) {
        return res.status(404).json({ message: 'No contacts found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: contacts });
};

// Add a new element
exports.addContact = (req, res) => {
    const newContact = req.body;
    const addedContact = contactsService.addContact(newContact);

    if (!addedContact) {
        return res.status(400).json({ message: 'Invalid Contact input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedContact });
};

// Update an element by ID
exports.updateContact = (req, res) => {
    const contactId = parseInt(req.params.id);
    const updatedContact = req.body;
    const result = contactsService.updateContact(contactId, updatedContact);

    if (!result) {
        return res.status(404).json({ message: 'Contact element is not found' });  
    }

    res.status(200).json({ message: 'Contact updated successfully', data: result });
};

// Delete a element using ID
exports.deleteContact = (req, res) => {
    const contactId = parseInt(req.params.id);
    const result = contactsService.deleteContact(contactId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
