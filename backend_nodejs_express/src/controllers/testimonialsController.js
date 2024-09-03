const testimonialsService = require('../services/testimonialsService');

// Retrieve all documents (array of elements)
exports.getAllTestimonials = (req, res) => {
    const testimonials = testimonialsService.getAllTestimonials();
    res.status(200).json({ message: 'OK', data: testimonials });
};

// Retreive metadata of documents
exports.getTestimonialsMeta = (req, res) => {
    const meta = testimonialsService.getTestimonialsMeta();
    res.status(200).json({ message: 'OK', data: meta });
};

// Find element by ID
exports.getTestimonialById = (req, res) => {
    const testimonialId = parseInt(req.params.id);
    const testimonial = testimonialsService.getTestimonialById(testimonialId);

    if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'OK', data: testimonial });
};

// Search elements by keyword
exports.getTestimonialsByName = (req, res) => {
    const name = req.query.name;
    const testimonials = testimonialsService.getTestimonialByName(name);

    if (!testimonials.length) {
        return res.status(404).json({ message: 'No testimonials found with the given name' });
    }

    res.status(200).json({ message: 'OK', data: testimonials });
};

// Add a new element
exports.addTestimonial = (req, res) => {
    const newTestimonial = req.body;
    const addedTestimonial = testimonialsService.addTestimonial(newTestimonial);

    if (!addedTestimonial) {
        return res.status(400).json({ message: 'Invalid Testimonial input data or duplicate data' });
    }

    res.status(201).json({ message: 'Element added successfully', data: addedTestimonial });
};

// Update an element by ID
exports.updateTestimonial = (req, res) => {
    const testimonialId = parseInt(req.params.id);
    const updatedTestimonial = req.body;
    const result = testimonialsService.updateTestimonial(testimonialId, updatedTestimonial);

    if (!result) {
        return res.status(404).json({ message: 'Testimonial element is not found' });  
    }

    res.status(200).json({ message: 'Testimonial updated successfully', data: result });
};

// Delete a element using ID
exports.deleteTestimonial = (req, res) => {
    const testimonialId = parseInt(req.params.id);
    const result = testimonialsService.deleteTestimonial(testimonialId);

    if (!result) {
        return res.status(404).json({ message: 'No element found with this id.' });
    }

    res.status(204).end();
};
