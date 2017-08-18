import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import Store from './Store.jsx';
import SiteFooter from './SiteFooter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      currentUsername: "",
      currentUserRep: null,
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

  findCurrentUser() {
    //For Localhost use the below url
    const url = "/currentUser";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        console.log(user)
        this.setState({
          currentUserId: user.id,
          currentUsername: user.username,
          currentUserRep: user.rep
        });
      });
  }
  componentDidMount(){
    this.findCurrentUser();
  }

  render() {
    return (
      <div className="app">
        <p>Welcome!!! {this.state.currentUsername}</p>
        <p>Reps: {this.state.currentUserRep}</p>l
        <Navbar currentUsername={this.state.currentUsername} />
        <Store currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep}/>
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
