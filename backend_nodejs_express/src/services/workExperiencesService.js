const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/WorkExperiences.json');

// Read from JSON file
const readWorkExperiencesFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);    
    return [];
  }
};

// Write to JSON file
const writeWorkExperiencesFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllWorkExperiences = () => {
  const data = readWorkExperiencesFile();
  return data.documents;
};

exports.getWorkExperiencesMeta = () => {
  const data = readWorkExperiencesFile();
  return data.meta;
};

exports.getWorkExperienceById = (id) => {
  const data = readWorkExperiencesFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getWorkExperiencesByName = (name) => {
  const data = readWorkExperiencesFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addWorkExperience = (newWorkExperience) => {
  const data = readWorkExperiencesFile();
  const itExists = data.documents.find(elt => elt.name.toLowerCase() === newWorkExperience.name.toLowerCase());

  if (itExists) {
    console.log('An object with this name already exists.');
    return null;    
  }

  newWorkExperience.id = data.documents.length + 1;
  data.documents.push(newWorkExperience);
  writeWorkExperiencesFile(data);
  console.log('Element added successfully.');
  return newWorkExperience;
};

exports.updateWorkExperience = (id, updatedWorkExperience) => {
  const data = readWorkExperiencesFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return null;
  }

  updatedWorkExperience.id = id; 
  data.documents[index] = { ...data.documents[index], ...updatedWorkExperience };
  writeWorkExperiencesFile(data);
  console.log('Element updated successfully.');
  return updatedWorkExperience;
};

exports.deleteWorkExperience = (id) => {
  const data = readWorkExperiencesFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return false;
  }

  data.documents.splice(index, 1);
  writeWorkExperiencesFile(data);
  console.log('Element deleted successfully.');
  return true;
};
