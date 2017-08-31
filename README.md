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
  ALPHAVANTAGE_KEY=your_api_key_here
  NEWSAPI_KEY=your_api_key_here
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

#### Login / Register

![Alt text](./client/images/login.png?raw=true)

![Alt text](./client/images/register.png?raw=true)

#### Landing Page

Welcome Aboard W.S. Marina. As you may see, there is a side profile of the current user, a leaderboard of the top ten users, news articles, a chat with multiple chat rooms and stock data. In the top right you will see live stock data coming in once per minute using Alpha Vantage's real-time API. This correlates with the users farm, which can be set at any time. W.S. Marina is a single page application, so upon a click on a nav bar option it will open a its corresponding modal. 

![Alt text](./client/images/landing.png?raw=true)

#### News

Get updated on the top ten trending news articles from four different sources using 'News API'.
View a small description of an article, that article's picture and a link to the source. W.S. Marina has chosen the following sources: Bloomberg, The Wall Street Journal, Business Insider and The Economist.

![Alt text](./client/images/article.png?raw=true)
![Alt text](./client/images/news.png?raw=true)
![Alt text](./client/images/newsource.png?raw=true)

#### Farm 

Set your farm in the farm modal to your top 5 favorite / favoured stocks. They will then be displayed on the landing page where you can collect W.S. Marina's User Reputation. For example, if you had chosen AAPL and it went up, you could collect 250 rep.  If it went down, onbly 100 rep.
Your farm is reset at midnight to allow you to collect once daily.

![Alt text](./client/images/collect.png?raw=true)
![Alt text](./client/images/farm.png?raw=true)

#### Bets 

In the bets modal, you can make a bet using your Reputation on basic predictions of market moves.  Choose a stock, make a prediction and wage your rep. Bets are paid in double upon collecting a successful bet. A loss will result in a loss of the wager. Bet will auto-collect after 24 hours of creation. 

![Alt text](./client/images/bets.png?raw=true)

#### Store 

Spend your Reputation on flairs to show off in the chat.

![Alt text](./client/images/store.png?raw=true)

#### Profile

Set your bio, user avatar and delete unwanted flairs

![Alt text](./client/images/profile.png?raw=true)

#### Chat 

Create new chatrooms, join existing and delete unwanted rooms. In a chat your user flairs will be shown beside your username once a message is sent. 

![Alt text](./client/images/chat.png?raw=true)

![Alt text](./client/images/newchatroom.png?raw=true)