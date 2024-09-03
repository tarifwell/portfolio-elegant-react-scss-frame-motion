const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');

// Routes
router.get('/testimonials', testimonialsController.getAllTestimonials);
router.get('/testimonials/meta', testimonialsController.getTestimonialsMeta);
router.get('/testimonials/:id', testimonialsController.getTestimonialById);
router.get('/testimonials/search/by-name', testimonialsController.getTestimonialsByName);
router.post('/testimonials', testimonialsController.addTestimonial);
router.put('/testimonials/:id', testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', testimonialsController.deleteTestimonial);

module.exports = router;
