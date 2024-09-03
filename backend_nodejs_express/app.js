require('dotenv').config();

const express = require('express');
const aboutsRoutes = require('./src/routes/aboutsRoutes');
const brandsRoutes = require('./src/routes/brandsRoutes');
const contactsRoutes = require('./src/routes/contactsRoutes');
const experiencesRoutes = require('./src/routes/experiencesRoutes');
const skillsRoutes = require('./src/routes/skillsRoutes');
const testimonialsRoutes = require('./src/routes/testimonialsRoutes');
const workExperiencesRoutes = require('./src/routes/workExperiencesRoutes');
const worksRoutes = require('./src/routes/worksRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', aboutsRoutes);
app.use('/api', brandsRoutes);
app.use('/api', contactsRoutes);
app.use('/api', experiencesRoutes);
app.use('/api', skillsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', workExperiencesRoutes);
app.use('/api', worksRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
