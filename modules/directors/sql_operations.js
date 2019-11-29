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
// Getting all the directors
const getAllDirectors = () => {
  return new Promise ((resolve, reject) => {
    connection.query('select * from director_stats', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Getting directors by id
const getDirectorsByID = (directorid) => {
  return new Promise ((resolve, reject) => {
    connection.query(`select d_name from director_stats where id=${directorid}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Inserting a new director
const addNewDirector = (dname) => {
  return new Promise ((resolve, reject) => {
    connection.query(`insert into director_stats (d_name) values("${dname}")`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Updating director details by director id
const updateDirector = (id, dName) => {
  return new Promise ((resolve, reject) => {
    connection.query(`update director_stats set d_name='${dName}' where id=${id}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Deleting director by director id
const deleteDirector = (id) => {
  return new Promise ((resolve, reject) => {
    connection.query(`delete from director_stats where id=${id}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = { getDirectorsByID, getAllDirectors, addNewDirector, updateDirector, deleteDirector };
