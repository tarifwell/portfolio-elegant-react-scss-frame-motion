const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

// Routes
router.get('/skills', skillsController.getAllSkills);
router.get('/skills/meta', skillsController.getSkillsMeta);
router.get('/skills/:id', skillsController.getSkillById);
router.get('/skills/search/by-name', skillsController.getSkillsByName);
router.post('/skills', skillsController.addSkill);
router.put('/skills/:id', skillsController.updateSkill);
router.delete('/skills/:id', skillsController.deleteSkill);

module.exports = router;
