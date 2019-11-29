/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const sqlOperations = require('./sql_operations.js');

app.listen(8080, () => { console.log('Server is running'); });

const dServerController = (request, response, next) => {
  console.log('Logged in director server');
  next();
};

app.use(dServerController);

//  Get all directors
app.get('/api/directors', (request, response) => {
  sqlOperations
    .getAllDirectors()
    .then((results) => {
      results.forEach((row) => {
        response.write(`${row.id} ${row.d_name}\n`);
      });
      response.end();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Get directors by id
app.get('/api/directors/:directorid', (request, response) => {
  sqlOperations
    .getDirectorsByID(request.params.directorid)
    .then((results) => {
      response.send(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

//  Delete director by id
app.delete('/api/directors/:directorid', (request, response) => {
  sqlOperations
    .deleteDirector(request.params.directorid)
    .then((results) => {
      response.send('Data deleted successfully');
    })
    .catch((error) => {
      console.log(error);
    });
});

// Updating director by id
app.put('/api/directors/:directorid', (request, response) => {
  const body = request.body;
  const dir = {
    name: body.name,
  };
  sqlOperations
    .updateDirector(request.params.directorid, dir.name)
    .then((results) => {
      response.send('Data updated successfully');
    })
    .catch((error) => {
      console.log(error);
    });
});

// Adding a new director
app.post('/api/directors/', (request, response) => {
  const body = request.body;
  const dir = {
    name: body.name,
  };
  sqlOperations
    .addNewDirector(dir.name)
    .then((results) => {
      response.send('Data Added successfully');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = { dServerController };
