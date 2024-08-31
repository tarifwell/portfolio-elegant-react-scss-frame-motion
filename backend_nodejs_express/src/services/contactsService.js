const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Contacts.json');

// Read from JSON file
const readContactsFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);
    return [];
  }
};

// Write to JSON file
const writeContactsFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllContacts = () => {
  const data = readContactsFile();
  return data.documents;
};

exports.getContactMeta = () => {
  const data = readContactsFile();
  return data.meta;
};

exports.getContactById = (id) => {
  const data = readContactsFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getContactByName = (name) => {
  const data = readContactsFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().contains(name.toLowerCase()));
};

exports.addContact = (newContact) => {
  const data = readContactsFile();
  const itExists = data.documents.find(elt => elt.name === newContact.name);
  if (!itExists) {
    newContact.id = data.documents.lenght + 1;
    data.documents.push(newContact);
    writeContactsFile(data);
    console.log('Element added successfully.');
    return newContact;
  } else {
    console.log('An object with this name already exists.');
    return null;
  }
};

exports.updateContact = (id, updatedContact) => {
  const data = readContactsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    updatedContact.id = id;
    data.documents[index] = updatedContact;
    writeContactsFile(data);
    console.log('Element updated successfully.');
    return updatedContact;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};

exports.deleteContact = (id) => {
  const data = readContactsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    const deletedElement = data.documents.splice(index, 1);
    writeContactsFile(data);
    console.log('Element deleted successfully.');
    return deletedElement;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};
