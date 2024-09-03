const express = require('express');
const router = express.Router();
const worksController = require('../controllers/worksController');

// Routes
router.get('/works', worksController.getAllWorks);
router.get('/works/meta', worksController.getWorksMeta);
router.get('/works/:id', worksController.getWorkById);
router.get('/works/search/by-name', worksController.getWorksByName);
router.post('/works', worksController.addWork);
router.put('/works/:id', worksController.updateWork);
router.delete('/works/:id', worksController.deleteWork);

module.exports = router;
