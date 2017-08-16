```
____    __    ____     _______.       .___  ___.      ___      .______       __  .__   __.      ___     
\   \  /  \  /   /    /       |       |   \/   |     /   \     |   _  \     |  | |  \ |  |     /   \    
 \   \/    \/   /    |   (----`       |  \  /  |    /  ^  \    |  |_)  |    |  | |   \|  |    /  ^  \   
  \            /      \   \           |  |\/|  |   /  /_\  \   |      /     |  | |  . `  |   /  /_\  \  
   \    /\    / __.----)   |    __    |  |  |  |  /  _____  \  |  |\  \----.|  | |  |\   |  /  _____  \
    \__/  \__/ (__)_______/    (__)   |__|  |__| /__/     \__\ | _| `._____||__| |__| \__| /__/     \__\
```
Getting started:

1. `npm install`
2. `cp server/.env.example .env` and update **.env** file
3. Create database and `npm run db:migrate`

During development:

1. `npm run nodemon` in one terminal
1. `npm run dev-server` in another terminal

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

