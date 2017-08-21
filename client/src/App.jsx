import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import Store from './Store.jsx';
import Farm from './Farm.jsx';
import SiteFooter from './SiteFooter.jsx';
import ChatList from './ChatList.jsx';
import ProfilePage from './ProfilePage.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      currentUsername: "",
      currentUserRep: null,
      currentUserTitle: "",
      currentUserFlairs: [],
      userFarm: [1,2,3,4,5],
      chatRooms: [],
      newsItems: [],
      leaders: []
    };
  }

  componentDidMount(){
    this.setFarm();
  }
  componentWillMount(){
    this.findCurrentUser();
    this.findCurrentUserFlairs();
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
        let title;
        if(user.rep < 1000) {
          title = "Peasant";
        } else if(user.rep <= 5000) {
          title = "Farmer";
        } else if (user.rep > 5000 && user.rep <= 50000 ) {
          title = "King";
        } else if (user.rep > 50000 && user.rep <= 100000 ) {
          title = "Big Boss";
        } else {
          title = "Big Baller";
        }
        this.setState({
          currentUserId: user.id,
          currentUsername: user.username,
          currentUserRep: user.rep,
          currentUserTitle: title
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

    const flairs = this.state.currentUserFlairs.map((flair) => {
      return flair.image;
    }); 

    return (
      <div className="app">
        <Navbar currentUsername={this.state.currentUsername} currentUserRep={this.state.currentUserRep} currentUserFlairs={this.state.currentUserFlairs} />
        <Leaders leaders={this.state.leaders} currentUserFlairs={this.state.currentUserFlairs} currentUserTitle={this.state.currentUserTitle} currentUsername={this.state.currentUsername} currentUserRep={this.state.currentUserRep} />
        <div className="features">
          <Ticker tickers={this.state.userFarm} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep} />
          <Store className="store" currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep} />
          <News newsItems={this.state.newsItems} />
          <Farm defaultValue={this.state.userFarm} setFarm={this.setFarm.bind(this)} />
          <ChatRooms chatRooms={this.state.chatRooms} currentUserId={this.state.currentUserId} currentUsername={this.state.currentUsername} currentUserFlairs={flairs} />
          <ChatList currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId}/>
          <form action="/logout" method="POST">
            <input type='submit' value='Logout' />
          </form>
        </div>
        <ProfilePage currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
