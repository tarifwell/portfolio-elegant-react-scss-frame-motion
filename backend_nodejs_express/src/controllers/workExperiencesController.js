const workExperiencesService = require('../services/workExperiencesService');

// Retrieve all documents (array of elements)
exports.getAllWorkExperiences = (req, res) => {
    const workExperiences = workExperiencesService.getAllWorkExperiences();
    res.status(200).json({ message: 'OK', data: workExperiences });
};

// Retreive metadata of documents
exports.getWorkExperiencesMeta = (req, res) => {
    const meta = workExperiencesService.getWorkExperiencesMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getWorkExperienceById = (req, res) => {
    const workExperienceId = parseInt(req.params.id);
    const workExperience = workExperiencesService.getWorkExperienceById(workExperienceId);

    if (!workExperience) {
        return res.status(404).json({ message: 'WorkExperience not found' });
    }

    res.status(200).json({ message: 'OK', data: workExperience });
};

// Search elements by keyword
exports.getWorkExperiencesByName = (req, res) => {
    const name = req.query.name;
    const workExperiences = workExperiencesService.getWorkExperienceByName(name);

    if (!workExperiences.length) {
        return res.status(404).json({ message: 'No workExperiences found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: workExperiences });
};

// Add a new element
exports.addWorkExperience = (req, res) => {
    const newWorkExperience = req.body;
    const addedWorkExperience = workExperiencesService.addWorkExperience(newWorkExperience);

    if (!addedWorkExperience) {
        return res.status(400).json({ message: 'Invalid WorkExperience input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedWorkExperience });
};

// Update an element by ID
exports.updateWorkExperience = (req, res) => {
    const workExperienceId = parseInt(req.params.id);
    const updatedWorkExperience = req.body;
    const result = workExperiencesService.updateWorkExperience(workExperienceId, updatedWorkExperience);

    if (!result) {
        return res.status(404).json({ message: 'WorkExperience element is not found' });  
    }

    res.status(200).json({ message: 'WorkExperience updated successfully', data: result });
};

// Delete a element using ID
exports.deleteWorkExperience = (req, res) => {
    const workExperienceId = parseInt(req.params.id);
    const result = workExperiencesService.deleteWorkExperience(workExperienceId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
