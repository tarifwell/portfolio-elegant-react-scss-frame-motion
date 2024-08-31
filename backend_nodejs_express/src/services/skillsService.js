const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Skills.json');

// Read from JSON file
const readSkillsFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);
    return [];
  }
};

// Write to JSON file
const writeSkillsFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllSkills = () => {
  const data = readSkillsFile();
  return data.documents;
};

exports.getSkillMeta = () => {
  const data = readSkillsFile();
  return data.meta;
};

exports.getSkillById = (id) => {
  const data = readSkillsFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getSkillByName = (name) => {
  const data = readSkillsFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().contains(name.toLowerCase()));
};

exports.addSkill = (newSkill) => {
  const data = readSkillsFile();
  const itExists = data.documents.find(elt => elt.name === newSkill.name);
  if (!itExists) {
    newSkill.id = data.documents.lenght + 1;
    data.documents.push(newSkill);
    writeSkillsFile(data);
    console.log('Element added successfully.');
    return newSkill;
  } else {
    console.log('An object with this name already exists.');
    // return itExists;
    return null;
  }
};

exports.updateSkill = (id, updatedSkill) => {
  const data = readSkillsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    updatedSkill.id = id;
    data.documents[index] = updatedSkill;
    writeSkillsFile(data);
    console.log('Element updated successfully.');
    return updatedSkill;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};

exports.deleteSkill = (id) => {
  const data = readSkillsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    const deletedElement = data.documents.splice(index, 1);
    writeSkillsFile(data);
    console.log('Element deleted successfully.');
    return deletedElement;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};
