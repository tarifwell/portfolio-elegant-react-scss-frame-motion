const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Abouts.json');

// Read from JSON file
const readAboutsFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);    
    return [];
  }
};

// Write to JSON file
const writeAboutsFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllAbouts = () => {
  const data = readAboutsFile();
  return data.documents;
};

exports.getAboutsMeta = () => {
  const data = readAboutsFile();
  return data.meta;
};

exports.getAboutById = (id) => {
  const data = readAboutsFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getAboutsByName = (name) => {
  const data = readAboutsFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addAbout = (newAbout) => {
  const data = readAboutsFile();
  const itExists = data.documents.find(elt => elt.name.toLowerCase() === newAbout.name.toLowerCase());

  if (itExists) {
    console.log('An object with this name already exists.');
    return null;    
  }

  newAbout.id = data.documents.length + 1;
  data.documents.push(newAbout);
  writeAboutsFile(data);
  console.log('Element added successfully.');
  return newAbout;
};

exports.updateAbout = (id, updatedAbout) => {
  const data = readAboutsFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return null;
  }

  updatedAbout.id = id; 
  data.documents[index] = { ...data.documents[index], ...updatedAbout };
  writeAboutsFile(data);
  console.log('Element updated successfully.');
  return updatedAbout;
};

exports.deleteAbout = (id) => {
  const data = readAboutsFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return false;
  }

  data.documents.splice(index, 1);
  writeAboutsFile(data);
  console.log('Element deleted successfully.');
  return true;
};
