/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fs = require('fs');
const mysql = require('mysql');

const file = fs.readFileSync('movies.json');
const obj = JSON.parse(file);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'prerit',
  password: '',
  database: 'movies_data',
});
const uploadingMovies = () => {
  connection.connect();
  for (const i of obj) {
    for (const j in i) {
      if (i[j] === 'NA') {
        i[j] = null;
      }
    }
    connection.query(`insert into movies_stats values(${i.Rank},  "${i.Title}",  "${i.Description}",  ${i.Runtime},  "${i.Genre}",  ${i.Rating},  ${i.Metascore},  ${i.Votes},  ${i.Gross_Earning_in_Mil},  "${i.Director}",  "${i.Actor}",  ${i.Year})`, (error, results) => {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
  }
  connection.end();
};

const uploadingDirectors = () => {
  connection.connect();
  connection.query('insert into director_stats (d_name) select distinct director from movies_stats');
  connection.end();
};


uploadingMovies();
uploadingDirectors();
