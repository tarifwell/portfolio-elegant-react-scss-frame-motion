const brandsService = require('../services/brandsService');

// Retrieve all documents (array of elements)
exports.getAllBrands = (req, res) => {
 const brands = brandsService.getAllBrands();
 res.status(200).json({ message: 'OK', data: brands });
};

// Retreive metadata of documents
exports.getBrandsMeta = (req, res) => {
    const meta = brandsService.getBrandsMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getBrandById = (req, res) => {
    const brandId = parseInt(req.params.id);
    const brand = brandsService.getBrandById(brandId);

    if (!brand) {
        return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'OK', data: brand });
};

// Search elements by keyword
exports.getBrandByName = (req, res) => {
    const name = req.query.name;
    const brands = brandsService.getBrandByName(name);

    if (!brands.length) {
        return res.status(404).json({ message: 'No brands found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: brands });
};

// Add a new element
exports.addBrand = (req, res) => {
    const newBrand = req.body;
    const addedBrand = brandsService.addBrand(newBrand);

    if (!addedBrand) {
        return res.status(400).json({ message: 'Invalid Brand input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedBrand });
};

// Update an element by ID
exports.updateBrand = (req, res) => {
    const brandId = parseInt(req.params.id);
    const updatedBrand = req.body;
    const brand = brandsService.updateBrand(brandId, updatedBrand);

    if (!brand) {
        return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand updated successfully', data: brand });
};

// Delete a element using ID
exports.deleteBrand = (req, res) => {
    const brandId = parseInt(req.params.id);
    const brand = brandsService.deleteBrand(brandId);

    if (!brand) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
  