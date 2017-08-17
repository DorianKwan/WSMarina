import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import SiteFooter from './SiteFooter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      tickers: [
        {
          name: 'AAPL',
          open: null,
          price: null,
          percentChange: null
        },
        {
          name: 'GOOG',
          open: null,
          price: null,
          percentChange: null
        },
        {
          name: 'AMZN',
          open: null,
          price: null,
          percentChange: null
        },
        {
          name: 'MSFT',
          open: null,
          price: null,
          percentChange: null
        },
        {
          name: 'FB',
          open: null,
          price: null,
          percentChange: null
        },
      ],
      chatRooms: [],
      newsItems: [],
      leaders: []
    };
  }

  render() {
    return (
      <div className="app">
        <Navbar currentUser={this.state.currentUser} />
        <Ticker tickers={this.state.tickers} />
        <Leaders leaders={this.state.leaders} />
        <News newsItems={this.state.newsItems} />
        <ChatRooms chatRooms={this.state.chatRooms} />  
        <form action="/logout" method="POST">
          <input type='submit' value='Logout' />
        </form>
      </div>
    );
  }
}

export default App;
