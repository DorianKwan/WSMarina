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
      tickers: [],
      chatRooms: [],
      newsItems: [],
      leaders: []
    };
  }
  componentDidMount(){
    fetch("http://localhost:8080/currentUser", {
      method: "GET",
      credentials: 'include', 
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return res.json();
    }).then((user) => {
      if (user) {
        console.log(user);
        this.setState({ user });
        this.socket.emit('user_logged_in', user);
      }
    });
  }

  render() {
    return (
      <div className="app">
        <p>Welcome!!!{this.state.currentUser}</p>
        <Navbar currentUser={this.state.currentUser} />
        <Ticker tickers={this.state.tickers} />
        <Leaders leaders={this.state.leaders} />
        <News newsItems={this.state.newsItems} />
        <form action="/logout" method="POST">
          <input type='submit' value='Logout' />
        </form>
      </div>
    );
  }
}

export default App;
