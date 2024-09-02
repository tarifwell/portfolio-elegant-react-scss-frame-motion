const aboutsService = require('../services/aboutsService');

// Retrieve all documents (array of elements)
exports.getAllAbouts = (req, res) => {
    const abouts = aboutsService.getAllAbouts();
    res.status(200).json({ message: 'OK', data: abouts });
};

// Retreive metadata of documents
exports.getAboutsMeta = (req, res) => {
    const meta = aboutsService.getAboutsMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getAboutById = (req, res) => {
    const aboutId = parseInt(req.params.id);
    const about = aboutsService.getAboutById(aboutId);

    if (!about) {
        return res.status(404).json({ message: 'About not found' });
    }

    res.status(200).json({ message: 'OK', data: about });
};

// Search elements by keyword
exports.getAboutByName = (req, res) => {
    const name = req.query.name;
    const abouts = aboutsService.getAboutByName(name);

    if (!abouts.length) {
        return res.status(404).json({ message: 'No abouts found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: abouts });
};

// Add a new element
exports.addAbout = (req, res) => {
    const newAbout = req.body;
    const addedAbout = aboutsService.addAbout(newAbout);

    if (!addedAbout) {
        return res.status(400).json({ message: 'Invalid About input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedAbout });
};

// Update an element by ID
exports.updateAbout = (req, res) => {
    const aboutId = parseInt(req.params.id);
    const updatedAbout = req.body;
    const result = aboutsService.updateAbout(aboutId, updatedAbout);

    if (!result) {
        return res.status(404).json({ message: 'About element is not found' });  
    }

    res.status(200).json({ message: 'About updated successfully', data: result });
};

// Delete a element using ID
exports.deleteAbout = (req, res) => {
    const aboutId = parseInt(req.params.id);
    const result = aboutsService.deleteAbout(aboutId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
