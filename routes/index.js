const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRoutes = require('./apiNotes');
// const htmlRoutes = require('./html');

const app = express();

app.use('/apiNotes', apiRoutes);
// app.use('/html', htmlRoutes);

module.exports = app;