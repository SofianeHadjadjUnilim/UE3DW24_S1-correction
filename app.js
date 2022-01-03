const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter').router;
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/', apiRouter);

module.exports = app;