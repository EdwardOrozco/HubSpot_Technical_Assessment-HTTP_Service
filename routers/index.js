const express = require('express');
const { upsertContact, listContacts, getContactByEmail } = require('../controllers/contacts');
const appRouter = express.Router();

appRouter.get('/contacts', listContacts);
appRouter.get('/contacts/:email', getContactByEmail);
appRouter.post('/contacts', upsertContact);

module.exports = { appRouter };