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
      currentUserFlairs: [],
      tickers: [
        {
          name: 'AAPL',
        },
        {
          name: 'GOOG',
        },
        {
          name: 'AMZN',
        },
        {
          name: 'MSFT',
        },
        {
          name: 'FB',
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
    }).then((response) => {
      return response.json();
    }).then((user) => {
        this.setState({
          currentUserId: user.id,
          currentUsername: user.username,
          currentUserRep: user.rep
        });
    });
  }
  
  findCurrentUserFlairs() {
    //For Localhost use the below url
    const url = "/currentUserFlairs";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((user_flairs) => {
      this.setState({
        currentUserFlairs: user_flairs
      });
    });
  }
  componentWillMount(){
    this.findCurrentUser();
    this.findCurrentUserFlairs();
  }

  render() {
    const flairs = this.state.currentUserFlairs.map((flair) => { 
      return (
        <img src= {flair.image} height="30" width="30" />
      );
    });

    return (
      <div className="app">
        <p>Welcome!!! {this.state.currentUsername} {flairs}</p>
        <p>Reps: {this.state.currentUserRep}</p>
        <Navbar currentUsername={this.state.currentUsername} />
        <Store currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep}/>
        <Ticker tickers={this.state.tickers} />
        <Leaders leaders={this.state.leaders} />
        <News newsItems={this.state.newsItems} />
        <ChatRooms chatRooms={this.state.chatRooms} currentUsername={this.state.currentUsername} />  
        <form action="/logout" method="POST">
          <input type='submit' value='Logout' />
        </form>
      </div>
    );
  }
}

export default App;
