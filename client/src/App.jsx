import React from 'react';
import Navbar from './Navbar.jsx';
import Ticker from './Ticker.jsx';
import Leaders from './Leaders.jsx';
import News from './News.jsx';
import ChatRooms from './ChatRooms.jsx';
import SiteFooter from './SiteFooter.jsx';
import ProfilePage from './ProfilePage.jsx';
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
      newsItems: [],
      leaders: [],
      ChatList: [],
      chatname: "",
      messages: [],
      clientCount: 1,
      socket: null
    };
    this.hideChat = this.hideChat.bind(this);
    this.joinChat = this.joinChat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount(){
    this.setFarm();
    this.getChatList();
    this.getChatroomUsers();
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

  getChatList() {
    //For Localhost use the below url
    const url = "/ChatList";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((ChatList) => {
      this.setState({
        ChatList: ChatList
      });
    });
  }

  hideChat(chatroomId) {
    //For Localhost use the below url
    const url = "/ChatList";
    const body = JSON.stringify({ chatroomId: chatroomId, currentUserId: this.state.currentUserId });
    fetch(url, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body: body
    }).then((response) => {
      return response.json();
    }).then((ChatList) => {
      this.setState({
        ChatList: ChatList
      });
    });
  }

  handleSubmit(chatname) {
    if (chatname) {
      const body = JSON.stringify({ chatname: chatname, currentUserId: this.state.currentUserId });
      const url = "/chatList"
      fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Content-Length": new Buffer(body).length
        },
        body: body
      }).then((response) => {
        return response.json()
      }).then((newchatlist) => {
        console.log("new chat list:", newchatlist)
        this.setState({
          ChatList: newchatlist
        })
      })
    }
  }

  getChatroomUsers(){
    const url = "/joinChat";
    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((chatroomUsers) => {
      console.log("info of chatroomid and its users:", chatroomUsers);
      chatroomUsers.forEach((obj) => {
        if (obj.user_id === this.state.currentUserId) {
          return this.setState({
            chatname: obj.name
          })
        }
      })
      const self = this;
      this.createNameSpace(chatroomUsers, self);
    })
  }

  joinChat(chatroomId) {
    if (this.state.socket) {
      this.state.socket.close();
    }
    const url = "/joinChat"
    const body = JSON.stringify({ chatroomId: chatroomId, currentUserId: this.state.currentUserId });
    fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body: body
    }).then((response) => {
      return response.json()
    }).then((chatroomUsers) => {
      console.log("info of joinchat and its users:", chatroomUsers);
      chatroomUsers.forEach((obj) => {
        if (obj.user_id === this.state.currentUserId) {
          return this.setState({
            chatname: obj.name,
            messages: []
          })
        }
      })
      const self = this;
      this.createNameSpace(chatroomUsers, self);
    })
  }

  createNameSpace(chatroomUsers, self) {
    chatroomUsers.forEach((chatroom) => {
      if (chatroom.user_id === this.state.currentUserId) {
        var s = io.connect(`http://localhost:3000/group-${chatroom.chatroom_id}`, { 'forceNew': true });
        this.setState({
          socket: s
        })
        s.on('data', function (event) {
          let messageRecieved = JSON.parse(event);
          console.log("message Recieved", messageRecieved)
          switch (messageRecieved.type) {
            // If incoming data has clientCount type, clientCount in state will be updated
            case "clientCount":
              self.setState({ clientCount: messageRecieved.number });
              break
            // Messages in state will be updated to include messageRecieved
            case "incomingMessage":
              let allMessages = self.state.messages.concat(messageRecieved);
              self.setState({ messages: allMessages });
              break;
          }
        })
      }
    })
  }

  onNewPost(content) {
    const newMessage = { username: this.state.currentUsername, content: content, currentUserFlairs: this.state.currentUserFlairs };
    newMessage.type = "incomingMessage";
    console.log("socket is:", this.state.socket)
    console.log("the message sent is", newMessage)
    const nsp = this.state.socket
    nsp.emit('message', JSON.stringify(newMessage));
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
          <ChatRooms messages={this.state.messages} clientCount={this.state.clientCount} chatname={this.state.chatname} onNewPost={this.onNewPost} socket={this.state.socket} currentUserId={this.state.currentUserId} currentUsername={this.state.currentUsername} currentUserFlairs={flairs} />
          <ChatList currentUsername={this.state.currentUsername} currentUserId={this.state.currentUserId} chatList={this.state.ChatList} hideChat={this.hideChat} joinChat={this.joinChat} handleSubmit={this.handleSubmit} />
        </div>
        <SiteFooter />
      </div>
    );
  }
}

export default App;
