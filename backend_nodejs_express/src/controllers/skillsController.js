const skillsService = require('../services/skillsService');

// Retrieve all documents (array of elements)
exports.getAllSkills = (req, res) => {
    const skills = skillsService.getAllSkills();
    res.status(200).json({ message: 'OK', data: skills });
};

// Retreive metadata of documents
exports.getSkillsMeta = (req, res) => {
    const meta = skillsService.getSkillsMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getSkillsById = (req, res) => {
    const skillId = parseInt(req.params.id);
    const skill = skillsService.getSkillById(skillId);

    if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'OK', data: skill });
};

// Search elements by keyword
exports.getSkillByName = (req, res) => {
    const name = req.query.name;
    const skills = skillsService.getSkillByName(name);

    if (!skills.length) {
        return res.status(404).json({ message: 'No skills found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: skills });
};

// Add a new element
exports.addSkill = (req, res) => {
    const newSkill = req.body;
    const addedSkill = skillsService.addSkill(newSkill);

    if (!addedSkill) {
        return res.status(400).json({ message: 'Invalid Skill input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedSkill });
};

// Update an element by ID
exports.updateSkill = (req, res) => {
    const skillId = parseInt(req.params.id);
    const updatedSkill = req.body;
    const result = skillsService.updateSkill(skillId, updatedSkill);

    if (!result) {
        return res.status(404).json({ message: 'Skill element is not found' });  
    }

    res.status(200).json({ message: 'Skill updated successfully', data: result });
};

// Delete a element using ID
exports.deleteSkill = (req, res) => {
    const skillId = parseInt(req.params.id);
    const result = skillsService.deleteSkill(skillId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
