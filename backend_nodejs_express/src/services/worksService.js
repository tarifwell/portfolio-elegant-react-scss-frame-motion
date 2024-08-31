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

exports.getWorkMeta = () => {
    const data = readWorksFile();
    return data.meta;
};

exports.getWorkById = (id) => {
    const data = readWorksFile();
    return data.documents.find((elt) => elt.id === id);
};

exports.getWorkByName = (name) => {
    const data = readWorksFile();
    return data.documents.filter((elt) => elt.name.toLowerCase().includes(name.toLowerCase()));
};

exports.addWork = (newWork) => {
    const data = readWorksFile();
    const itExists = data.documents.find((elt) => elt.title === newWork.title);
    if (!itExists) {
        newWork.id = data.documents.length + 1;
        data.documents.push(newWork);
        writeWorksFile(data);
        console.log('Element added successfully.');
        return newWork;
    } else {
        console.log('An object with this title already exists.');
        return null;
    }
};

exports.updateWork = (id, updatedWork) => {
    const data = readWorksFile();
    const index = data.documents.findIndex((elt) => elt.title === updatedWork.title);
    if (index > -1) {
        updatedWork.id = id;
        data.documents[index] = updatedWork;
        writeWorksFile(data);
        console.log('Element updated successfully.');
        return updatedWork;
    } else {
        console.log('No element found with this id.');
        return null;
    }
};

exports.deleteWork = (id) => {
    const data = readWorksFile();
    const index = data.documents.findIndex((elt) => elt.id === id);
    if (index > -1) {
        const deletedElement = data.documents.splice(index, 1);
        writeWorksFile(data);
        console.log('Element deleted successfully.');
        return deletedElement;
    } else {
        console.log('No element found with this id.');
        return null;
    }
};
