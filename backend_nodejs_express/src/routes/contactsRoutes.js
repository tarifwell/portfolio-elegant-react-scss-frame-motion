const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Routes
router.get('/contacts', contactsController.getAllContacts);
router.get('/contacts/meta', contactsController.getContactsMeta);
router.get('/contacts/:id', contactsController.getContactById);
router.get('/contacts/search/by-name', contactsController.getContactsByName);
router.post('/contacts', contactsController.addContact);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;
