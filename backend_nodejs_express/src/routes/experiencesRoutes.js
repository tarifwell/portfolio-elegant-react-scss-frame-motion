const express = require('express');
const router = express.Router();
const experiencesController = require('../controllers/experiencesController');

// Routes
router.get('/experiences', experiencesController.getAllExperiences);
router.get('/experiences/meta', experiencesController.getExperiencesMeta);
router.get('/experiences/:id', experiencesController.getExperienceById);
router.get('/experiences/search/by-name', experiencesController.getExperiencesByName);
router.post('/experiences', experiencesController.addExperience);
router.put('/experiences/:id', experiencesController.updateExperience);
router.delete('/experiences/:id', experiencesController.deleteExperience);

module.exports = router;
