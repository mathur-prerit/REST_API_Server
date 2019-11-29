/* eslint-disable func-call-spacing */
/* eslint-disable arrow-body-style */
/* eslint-disable no-spaced-func */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-console */

//  Libraries requirements
const mysql = require('mysql');

// Database Connection Part
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'prerit',
  password: '',
  database: 'movies_data',
});

//  Initiating database connection
connection.connect();

//  Logic part for inserting data in sql tables
// Getting all the movies
const getAllmovies = () => {
  return new Promise ((resolve, reject) => {
    connection.query('select * from movies_stats', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Getting movies by id
const getmoviesByID = (movieid) => {
  return new Promise ((resolve, reject) => {
    connection.query(`select * from movies_stats where rank=${movieid}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Inserting a new movie
const addNewmovie = (id, mName, desc, runtime, genre, rating, metascore, votes, gross, director, actor, year) => {
  return new Promise ((resolve, reject) => {
    connection.query(`insert into movies_stats values(${id},'${mName}','${desc}',${runtime},'${genre}',${rating},${metascore},${votes},${gross},'${director}','${actor}',${year} )`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Updating movie details by movie id
const updatemovie = (id, mName, desc, runtime, genre, rating, metascore, votes, gross, director, actor, year) => {
  return new Promise ((resolve, reject) => {
    connection.query(`update movies_stats set title='${mName}',description='${desc}',runtime=${runtime},genre='${genre}',rating=${rating},metascore=${metascore},votes=${votes},gross=${gross},director='${director}',actor='${actor}',year=${year} where rank=${id}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Deleting movie by movie id
const deletemovie = (id) => {
  return new Promise ((resolve, reject) => {
    connection.query(`delete from movies_stats where rank=${id}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = { getmoviesByID, getAllmovies, addNewmovie, updatemovie, deletemovie };
