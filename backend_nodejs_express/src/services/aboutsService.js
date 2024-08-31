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

exports.getAboutMeta = () => {
  const data = readAboutsFile();
  return data.meta;
};

exports.getAboutById = (id) => {
  const data = readAboutsFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getAboutByName = (name) => {
  const data = readAboutsFile();
  return data.documents.filter((elt) => elt.title.toLowerCase().contains(name.toLowerCase()));
};

exports.addAbout = (newAbout) => {
  const data = readAboutsFile();
  const itExists = data.documents.find(elt => elt.title === newAbout.title);
  if (!itExists) {
    newAbout.id = data.documents.lenght + 1;
    data.documents.push(newAbout);
    writeAboutsFile(data);
    console.log('Element added successfully.');
    return newAbout;
  } else {
    console.log('An object with this title already exists.');
    return null; // return itExists;
  }
};

exports.updateAbout = (id, updatedAbout) => {
  const data = readAboutsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    updatedAbout.id = id; // To avoid id duplication in the updated array    
    data.documents[index] = updatedAbout;
    writeAboutsFile(data);
    console.log('Element updated successfully.');
    return updatedAbout;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};

exports.deleteAbout = (id) => {
  const data = readAboutsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    const deletedElement = data.documents.splice(index, 1);
    writeAboutsFile(data);
    console.log('Element deleted successfully.');
    return deletedElement; //return true;
  } else {
    console.log('No element found with this id.');
    return null; //return false;
  }
};
