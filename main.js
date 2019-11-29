/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

const directorsController = require('./modules/directors/server_request.js');
const moviesController = require('./modules/movies/server_request.js');

// app.listen(8080, () => { console.log('Server is running'); });

app.use(moviesController.mServerController);
app.use(directorsController.dServerController);
