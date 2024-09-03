const experiencesService = require('../services/experiencesService');

// Retrieve all documents (array of elements)
exports.getAllExperiences = (req, res) => {
    const experiences = experiencesService.getAllExperiences();
    res.status(200).json({ message: 'OK', data: experiences });
};

// Retreive metadata of documents
exports.getExperiencesMeta = (req, res) => {
    const meta = experiencesService.getExperiencesMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getExperienceById = (req, res) => {
    const experienceId = parseInt(req.params.id);
    const experience = experiencesService.getExperienceById(experienceId);

    if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'OK', data: experience });
};

// Search elements by keyword
exports.getExperiencesByName = (req, res) => {
    const name = req.query.name;
    const experiences = experiencesService.getExperienceByName(name);

    if (!experiences.length) {
        return res.status(404).json({ message: 'No experiences found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: experiences });
};

// Add a new element
exports.addExperience = (req, res) => {
    const newExperience = req.body;
    const addedExperience = experiencesService.addExperience(newExperience);

    if (!addedExperience) {
        return res.status(400).json({ message: 'Invalid Experience input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedExperience });
};

// Update an element by ID
exports.updateExperience = (req, res) => {
    const experienceId = parseInt(req.params.id);
    const updatedExperience = req.body;
    const result = experiencesService.updateExperience(experienceId, updatedExperience);

    if (!result) {
        return res.status(404).json({ message: 'Experience element is not found' });  
    }

    res.status(200).json({ message: 'Experience updated successfully', data: result });
};

// Delete a element using ID
exports.deleteExperience = (req, res) => {
    const experienceId = parseInt(req.params.id);
    const result = experiencesService.deleteExperience(experienceId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
