```
____    __    ____      _______.     .___  ___.      ___      .______        __  .__   __.      ___     
\   \  /  \  /   /     /       |     |   \/   |     /   \     |   _  \      |  | |  \ |  |     /   \    
 \   \/    \/   /     |   (----`     |  \  /  |    /  ^  \    |  |_)  |     |  | |   \|  |    /  ^  \   
  \            /       \   \         |  |\/|  |   /  /_\  \   |      /      |  | |  . `  |   /  /_\  \  
   \    /\    / __  .----)   | __    |  |  |  |  /  _____  \  |  |\  \----. |  | |  |\   |  /  _____  \
    \__/  \__/ (__) |_______/ (__)   |__|  |__| /__/     \__\ | _| `._____| |__| |__| \__| /__/     \__\
```
Getting started:

1. `npm install`
2. `cp server/.env.example server/.env` and update **.env** file
3. Create database and `npm run db:migrate`

During development:

1. `npm run nodemon` in one terminal
1. `npm run dev-server` in another terminal

`git clone git@github.com:DorianKwan/WSMarina.git`
`cd WSMarina`
`npm install`

in psql `drop database wsmarina if exists;`
in psql `create database wsmarina;`

Copy and create .env

 `DB_NAME=wsmarina
  DB_USER=vagrant
  DB_PASS=password
  ALPHAVANTAGE_KEY
  NEWSAPI_KEY`

To migrate latest: `npm db:migrate` 
To start backend server: `npm start`
// in another terminal
To start frontend server `npm run dev-server`
Visit localhost:3000
