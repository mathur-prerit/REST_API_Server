/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.urlencoded());
app.use(express.json());

const sqlOperations = require('./sql_operations.js');

app.listen(8080, () => { console.log('Server is running'); });

const mServerController = (request, response, next) => {
  console.log('Logged in movies server');
  next();
};

app.use(mServerController);

//  Get all movies
app.get('/api/movies', (request, response) => {
  sqlOperations.getAllmovies().then((results) => {
    /* results.forEach((row) => {
      response.write(`${row.rank} ${row.title} ${row.description} ${row.runtime} ${row.genre} ${row.rating} ${row.metascore} ${row.votes} ${row.gross} ${row.director} ${row.actor} ${row.year}\n`);
    });
    response.end(); */
    response.send(results);
  }).catch((error) => {
    console.log(error);
  });
});

// Get movies by id
app.get('/api/movies/:movieid', (request, response) => {
  sqlOperations.getmoviesByID(request.params.movieid).then((results) => {
    response.send(results);
  }).catch((error) => {
    console.log(error);
  });
});

//  Delete movie by id
app.delete('/api/movies/:movieid', (request, response) => {
  sqlOperations.deletemovie(request.params.movieid).then((results) => {
    response.send('Data deleted successfully');
  }).catch((error) => {
    console.log(error);
  });
});

// Updating movie by id
app.put('/api/movies/:movieid', (request, response) => {
  const body = request.body;
  const dir = {
    title: body.title, description: body.description, runtime: body.runtime, genre: body.genre, rating: body.rating, metascore: body.metascore, votes: body.votes, gross: body.gross, director: body.director, actor: body.actor, year: body.year,
  };
  sqlOperations.updatemovie(request.params.movieid, dir.title, dir.description, dir.runtime, dir.genre, dir.rating, dir.metascore, dir.votes, dir.gross, dir.director, dir.actor, dir.year).then((results) => {
    response.send('Data updated successfully');
  }).catch((error) => {
    console.log(error);
  });
});

// Adding a new movie
app.post('/api/movies/:movieid', (request, response) => {
  const body = request.body;
  const dir = {
    title: body.title, description: body.description, runtime: body.runtime, genre: body.genre, rating: body.rating, metascore: body.metascore, votes: body.votes, gross: body.gross, director: body.director, actor: body.actor, year: body.year,
  };
  sqlOperations.addNewmovie(request.params.movieid, dir.title, dir.description, dir.runtime, dir.genre, dir.rating, dir.metascore, dir.votes, dir.gross, dir.director, dir.actor, dir.year).then((results) => {
    response.send('Data Added successfully');
  }).catch((error) => {
    console.log(error);
  });
});

module.exports = { mServerController };
