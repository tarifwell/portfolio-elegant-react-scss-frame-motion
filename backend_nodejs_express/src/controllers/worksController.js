const worksService = require('../services/worksService');

// Retrieve all documents (array of elements)
exports.getAllWorks = (req, res) => {
    const works = worksService.getAllWorks();
    res.status(200).json({ message: 'OK', data: works });
};

// Retreive metadata of documents
exports.getWorksMeta = (req, res) => {
    const meta = worksService.getWorksMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getWorkById = (req, res) => {
    const workId = parseInt(req.params.id);
    const work = worksService.getWorkById(workId);

    if (!work) {
        return res.status(404).json({ message: 'Work not found' });
    }

    res.status(200).json({ message: 'OK', data: work });
};

// Search elements by keyword
exports.getWorksByName = (req, res) => {
    const name = req.query.name;
    const works = worksService.getWorksByName(name);

    if (!works.length) {
        return res.status(404).json({ message: 'No works found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: works });
};

// Add a new element
exports.addWork = (req, res) => {
    const newWork = req.body;
    const addedWork = worksService.addWork(newWork);

    if (!addedWork) {
        return res.status(400).json({ message: 'Invalid Work input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedWork });
};

// Update an element by ID
exports.updateWork = (req, res) => {
    const workId = parseInt(req.params.id);
    const updatedWork = req.body;
    const result = worksService.updateWork(workId, updatedWork);

    if (!result) {
        return res.status(404).json({ message: 'Work element is not found' });  
    }

    res.status(200).json({ message: 'Work updated successfully', data: result });
};

// Delete a element using ID
exports.deleteWork = (req, res) => {
    const workId = parseInt(req.params.id);
    const result = worksService.deleteWork(workId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
