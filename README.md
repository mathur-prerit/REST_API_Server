This project contains a REST-API implementation for a server which contains data for movies and directors.

With ```json_to_tables.js``` can transform ```movies.json``` into mySQL tables.

2 seperate server file was created for movies and directors, which will be merged in later updates of project.
You can apply all REST API features like GET, PUT, POST, DELETE.

Code will be refactored using ORM - sequelize.

To run this server execute ```./modules/movies/server_request.js``` and ```./modules/directors/server_request.js``` for movies and directors respectively.

Dependencies:
```npm install nodemon```
```npm install eslint```
```npm install mysql```
```npm install express```


