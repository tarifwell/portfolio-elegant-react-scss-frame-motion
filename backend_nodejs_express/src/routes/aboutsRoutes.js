const express = require('express');
const router = express.Router();
const aboutsController = require('../controllers/aboutsController');

// Routes
router.get('/abouts', aboutsController.getAllAbouts);
router.get('/abouts/meta', aboutsController.getAboutsMeta);
router.get('/abouts/:id', aboutsController.getAboutById);
router.get('/abouts/search/by-name', aboutsController.getAboutsByName);
router.post('/abouts', aboutsController.addAbout);
router.put('/abouts/:id', aboutsController.updateAbout);
router.delete('/abouts/:id', aboutsController.deleteAbout);

module.exports = router;
