import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import Store from './Store.jsx';
import Farm from './Farm.jsx';
import SiteFooter from './SiteFooter.jsx';
import ProfilePage from './ProfilePage.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      currentUsername: "",
      currentUserRep: null,
      currentUserFlairs: [],
      userFarm: [1,2,3,4,5],
      chatRooms: [],
      newsItems: [],
      leaders: []
    };
  }

  componentDidMount(){
    this.findCurrentUser();
    this.findCurrentUserFlairs();
    this.setFarm();
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

  setFarm() {
    const url = "/farms";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    }).then((slots) => {
      this.setState({ 
        userFarm: [ 
          { name: slots.slot_01.name },
          { name: slots.slot_02.name },
          { name: slots.slot_03.name },
          { name: slots.slot_04.name },
          { name: slots.slot_05.name }
        ]
      });
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }

  render() {
    return (
      <div className="app">
        <Navbar currentUsername={this.state.currentUsername} currentUserRep={this.state.currentUserRep} currentUserFlairs={this.state.currentUserFlairs} />
        <Ticker tickers={this.state.userFarm} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep} />
        <Leaders leaders={this.state.leaders} />
        <Store className="store" currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep} />
        <News newsItems={this.state.newsItems} />
        <Farm defaultValue={this.state.userFarm} setFarm={this.setFarm.bind(this)} />
        <ChatRooms chatRooms={this.state.chatRooms} />  
        <form action="/logout" method="POST">
          <input type='submit' value='Logout' />
        </form>
        <ProfilePage currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
