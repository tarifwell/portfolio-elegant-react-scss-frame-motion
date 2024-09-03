const express = require('express');
const router = express.Router();
const expereriencesController = require('../controllers/expereriencesController');

// Routes
router.get('/expereriences', expereriencesController.getAllExperiences);
router.get('/expereriences/meta', expereriencesController.getExperiencesMeta);
router.get('/expereriences/:id', expereriencesController.getExperienceById);
router.get('/expereriences/search/by-name', expereriencesController.getExperiencesByName);
router.post('/expereriences', expereriencesController.addExperience);
router.put('/expereriences/:id', expereriencesController.updateExperience);
router.delete('/expereriences/:id', expereriencesController.deleteExperience);

module.exports = router;
