const express = require('express');
const router = express.Router();
const workExperiencesController = require('../controllers/workExperiencesController');

// Routes
router.get('/workExperiences', workExperiencesController.getAllWorkExperiences);
router.get('/workExperiences/meta', workExperiencesController.getWorkExperiencesMeta);
router.get('/workExperiences/:id', workExperiencesController.getWorkExperienceById);
router.get('/workExperiences/search/by-name', workExperiencesController.getWorkExperiencesByName);
router.post('/workExperiences', workExperiencesController.addWorkExperience);
router.put('/workExperiences/:id', workExperiencesController.updateWorkExperience);
router.delete('/workExperiences/:id', workExperiencesController.deleteWorkExperience);

module.exports = router;
