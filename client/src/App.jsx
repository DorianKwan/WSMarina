import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import SiteFooter from './SiteFooter.jsx';
import ProfilePage from './ProfilePage.jsx';
import Bets from './Bets.jsx';
import ChatList from './ChatList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      currentUsername: "",
      currentUserRep: null,
      currentUserTitle: "",
      currentUserFlairs: [],
      currentUserBio: "",
      currentUserImage: "",
      currentUserEmail: "",
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
          title = "Ant";
        } else if(user.rep <= 5000) {
          title = "Farmer";
        } else if (user.rep > 5000 && user.rep <= 50000 ) {
          title = "Citizen";
        } else if (user.rep > 50000 && user.rep <= 100000 ) {
          title = "Big Boss";
        } else {
          title = "Big Baller";
        }

        let image;
        if(!user.image) {
          image = "https://thinkcerca.com/wp-content/uploads/2015/02/Avatar-Gray.gif";
        } else {
          image = user.image;
        }
        this.setState({
          currentUserId: user.id,
          currentUsername: user.username,
          currentUserRep: user.rep,
          currentUserTitle: title,
          currentUserBio: user.bio,
          currentUserImage: image,
          currentUserEmail: user.email
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
        <video autoPlay loop muted src="/videos/waves.mp4" />
        <Navbar currentUsername={this.state.currentUsername} 
        currentUserRep={this.state.currentUserRep} 
        currentUserFlairs={this.state.currentUserFlairs} 
        defaultValue={this.state.userFarm} 
        setFarm={this.setFarm.bind(this)} 
        currentUserId={this.state.currentUserId} />
        <Leaders 
        leaders={this.state.leaders}
        currentUserTitle={this.state.currentUserTitle} 
        currentUsername={this.state.currentUsername}
        currentUserRep={this.state.currentUserRep}
        currentUserImage={this.state.currentUserImage} />
        
        <div className="features">
          <Ticker tickers={this.state.userFarm} currentUserId={this.state.currentUserId} currentUserRep={this.state.currentUserRep} />
          <News newsItems={this.state.newsItems} />
          <Bets currentUserRep={this.state.currentUserRep} />
          <ChatRooms chatRooms={this.state.chatRooms} currentUserId={this.state.currentUserId} currentUsername={this.state.currentUsername} currentUserFlairs={flairs} />
          <ChatList currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId}/>
        </div>
        <SiteFooter />
      </div>
    );
  }
}

export default App;
