```
____    __    ____      _______.     .___  ___.      ___      .______        __  .__   __.      ___     
\   \  /  \  /   /     /       |     |   \/   |     /   \     |   _  \      |  | |  \ |  |     /   \    
 \   \/    \/   /     |   (----`     |  \  /  |    /  ^  \    |  |_)  |     |  | |   \|  |    /  ^  \   
  \            /       \   \         |  |\/|  |   /  /_\  \   |      /      |  | |  . `  |   /  /_\  \  
   \    /\    / __  .----)   | __    |  |  |  |  /  _____  \  |  |\  \----. |  | |  |\   |  /  _____  \
    \__/  \__/ (__) |_______/ (__)   |__|  |__| /__/     \__\ | _| `._____| |__| |__| \__| /__/     \__\
```
# Welcome

### Getting started:

1. `git clone git@github.com:DorianKwan/WSMarina.git`
2. `cd WSMarina`
3. `npm install`
4. Head to AlphaVantage and NewsAPI to grab your own keys
5. `cp server/.env.example server/.env` and update **.env** file
  ```
  DB_NAME=wsmarina
  DB_USER=vagrant
  DB_PASS=password
  ALPHAVANTAGE_KEY
  NEWSAPI_KEY
  ```
6. Create database and `npm run db:migrate`
 * `drop database wsmarina if exists;`
 * `create database wsmarina;`
7. Run the seed `npm run db:seed`

### During development:

1. `npm run nodemon` in one terminal
2. `npm run dev-server` in another terminal

Visit localhost:3000

### Screenshots

Login / Register

![Alt text](./client/images/login.png?raw=true)

![Alt text](./client/images/register.png?raw=true)

Landing Page

![Alt text](./client/images/landing.png?raw=true)

News

![Alt text](./client/images/article.png?raw=true)
![Alt text](./client/images/news.png?raw=true)
![Alt text](./client/images/newsource.png?raw=true)

Farm 

![Alt text](./client/images/collect.png?raw=true)
![Alt text](./client/images/farm.png?raw=true)

Bets 

![Alt text](./client/images/bets.png?raw=true)

Store 

![Alt text](./client/images/store.png?raw=true)

Profile

![Alt text](./client/images/profile.png?raw=true)

Chat 

![Alt text](./client/images/chat.png?raw=true)

![Alt text](./client/images/newchatroom.png?raw=true)