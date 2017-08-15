git clone git@github.com:DorianKwan/WSMarina.git
cd WSMarina
npm install
psql drop database WSMarina;
psql create database WSMarina;
//create .env
//DB_NAME=wsmarina
  DB_USER=vagrant
  DB_PASS=password
knex migrate:latest 
npm start
// in another terminal
npm run start:api
localhost:8080