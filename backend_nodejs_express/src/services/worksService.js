const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Works.json');

// Read from JSON file
const readWorksFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);    
    return [];
  }
};

// Write to JSON file
const writeWorksFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllWorks = () => {
  const data = readWorksFile();
  return data.documents;
};

exports.getWorksMeta = () => {
  const data = readWorksFile();
  return data.meta;
};

exports.getWorkById = (id) => {
  const data = readWorksFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getWorksByName = (name) => {
  const data = readWorksFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addWork = (newWork) => {
  const data = readWorksFile();
  const itExists = data.documents.find(elt => elt.name.toLowerCase() === newWork.name.toLowerCase());

  if (itExists) {
    console.log('An object with this name already exists.');
    return null;    
  }

  newWork.id = data.documents.length + 1;
  data.documents.push(newWork);
  writeWorksFile(data);
  console.log('Element added successfully.');
  return newWork;
};

exports.updateWork = (id, updatedWork) => {
  const data = readWorksFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return null;
  }

  updatedWork.id = id; 
  data.documents[index] = { ...data.documents[index], ...updatedWork };
  writeWorksFile(data);
  console.log('Element updated successfully.');
  return updatedWork;
};

exports.deleteWork = (id) => {
  const data = readWorksFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return false;
  }

  data.documents.splice(index, 1);
  writeWorksFile(data);
  console.log('Element deleted successfully.');
  return true;
};
