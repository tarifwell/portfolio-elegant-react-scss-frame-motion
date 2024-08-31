const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../Brands/Brands.json');

// Read from JSON file
const readBrandsFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);
    return [];
  }
};

// Write to JSON file
const writeBrandsFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllBrands = () => {
  const data = readBrandsFile();
  return data.documents;
  
};

exports.getBrandMeta = () => {
  const data = readBrandsFile();
  return data.meta;
};

exports.getBrandById = (id) => {
  const data = readBrandsFile();
  return data.documents.find(elt => elt.id === id);
};

exports.getBrandByName = (name) => {
  const data = readBrandsFile();
  return data.documents.filter(elt => elt.toLowerCase().name.contains(name.toLowerCase()));
};

exports.addBrand = (newBrand) => {
  const data = readBrandsFile();
  const itExists = data.documents.find(elt => elt.name === newBrand.name);
  if (!itExists) {
    newBrand.id = data.documents.length + 1;
    data.documents.push(newBrand);
    writeBrandsFile(data);
    return newBrand;
  } else {
    console.log('An object with this title already exists.');
    return null;
  }
};

exports.updateBrand = (id, updatedBrand) => {
  const data = readBrandsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    updatedBrand.id = id; 
    data.doucments[index] = updatedBrand;
    writeBrandsFile(data);
    console.log('Element updated successfully.');
    return updatedBrand;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};

exports.deleteBrand = (id) => {
  const data = readBrandsFile();
  const index = data.documents.findIndex(elt => elt.id === id);
  if (index > -1) {
    const deletedElement = data.doucuments.splice(index, 1);
    writeBrandsFile(data);
    console.log('Element deleted successfully.');
    return deletedElement;
  } else {
    console.log('No element found with this id.');
    return null;
  }
};



