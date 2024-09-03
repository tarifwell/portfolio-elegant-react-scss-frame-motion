const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/Testimonials.json');

// Read from JSON file
const readTestimonialsFile = () => {
  try {
    const dataFile = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(dataFile);
  } catch (error) {
    console.error('Failed to read JSON file: ', error);    
    return [];
  }
};

// Write to JSON file
const writeTestimonialsFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Failed to write JSON file: ', error);
  }
};

// Operations on JSON file

exports.getAllTestimonials = () => {
  const data = readTestimonialsFile();
  return data.documents;
};

exports.getTestimonialsMeta = () => {
  const data = readTestimonialsFile();
  return data.meta;
};

exports.getTestimonialById = (id) => {
  const data = readTestimonialsFile();
  return data.documents.find((elt) => elt.id === id);  
};

exports.getTestimonialsByName = (name) => {
  const data = readTestimonialsFile();
  return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addTestimonial = (newTestimonial) => {
  const data = readTestimonialsFile();
  const itExists = data.documents.find(elt => elt.name.toLowerCase() === newTestimonial.name.toLowerCase());

  if (itExists) {
    console.log('An object with this name already exists.');
    return null;    
  }

  newTestimonial.id = data.documents.length + 1;
  data.documents.push(newTestimonial);
  writeTestimonialsFile(data);
  console.log('Element added successfully.');
  return newTestimonial;
};

exports.updateTestimonial = (id, updatedTestimonial) => {
  const data = readTestimonialsFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return null;
  }

  updatedTestimonial.id = id; 
  data.documents[index] = { ...data.documents[index], ...updatedTestimonial };
  writeTestimonialsFile(data);
  console.log('Element updated successfully.');
  return updatedTestimonial;
};

exports.deleteTestimonial = (id) => {
  const data = readTestimonialsFile();
  const index = data.documents.findIndex(elt => elt.id === id);

  if (index === -1) {
    console.log('No element found with this id.');
    return false;
  }

  data.documents.splice(index, 1);
  writeTestimonialsFile(data);
  console.log('Element deleted successfully.');
  return true;
};
