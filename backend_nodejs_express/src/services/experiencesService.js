const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Experiences.json');

// Read from JSON file
const readExperiencesFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);    
    return [];
  }
};

// Write to JSON file
const writeExperiencesFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllExperiences = () => {
  const data = readExperiencesFile();
  return data.documents;
};

exports.getExperiencesMeta = () => {
  const data = readExperiencesFile();
  return data.meta;
};

exports.getExperienceById = (id) => {
  const data = readExperiencesFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getExperiencesByName = (name) => {
  const data = readExperiencesFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addExperience = (newExperience) => {
  const data = readExperiencesFile();
  const itExists = data.documents.find(elt => elt.name.toLowerCase() === newExperience.name.toLowerCase());

  if (itExists) {
    console.log('An object with this name already exists.');
    return null;    
  }

  newExperience.id = data.documents.length + 1;
  data.documents.push(newExperience);
  writeExperiencesFile(data);
  console.log('Element added successfully.');
  return newExperience;
};

exports.updateExperience = (id, updatedExperience) => {
  const data = readExperiencesFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return null;
  }

  updatedExperience.id = id; 
  data.documents[index] = { ...data.documents[index], ...updatedExperience };
  writeExperiencesFile(data);
  console.log('Element updated successfully.');
  return updatedExperience;
};

exports.deleteExperience = (id) => {
  const data = readExperiencesFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return false;
  }

  data.documents.splice(index, 1);
  writeExperiencesFile(data);
  console.log('Element deleted successfully.');
  return true;
};
