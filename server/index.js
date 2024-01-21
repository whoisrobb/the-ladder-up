const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { sequelize } = require('./models');

/* CONFIGURATIONS */
const app = express();
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(express.json());
app.use(cors());


/* SEQUELIZE SETUP */
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        console.log('Database and tables synced')
    })
    .catch((err) => {
        console.error(err)
    })


/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));