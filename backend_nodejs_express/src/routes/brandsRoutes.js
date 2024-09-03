const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsController');

// Routes
router.get('/brands', brandsController.getAllBrands);
router.get('/brands/meta', brandsController.getBrandsMeta);
router.get('/brands/:id', brandsController.getBrandById);
router.get('/brands/search/by-name', brandsController.getBrandsByName);
router.post('/brands', brandsController.addBrand);
router.put('/brands/:id', brandsController.updateBrand);
router.delete('/brands/:id', brandsController.deleteBrand);

module.exports = router;
