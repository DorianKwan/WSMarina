import React, { Component } from 'react';

import ChatNav from './chatroom/ChatNav.jsx';
import MessageList from './chatroom/MessageList.jsx';
import ChatBar from './chatroom/ChatBar.jsx';

// Class App recieves response from server and renders components from Chatbar, NavBar, MessageList and Messages
class ChatRooms extends Component {
  constructor(props) {
    super(props);
    // clientCount represents the number of users connected to server
    this.state = {
      chatname: "",
      currentUserFlairs: "",
      messages: [],
      clientCount: 0,
      socket: null
    }

    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    const url = "/joinChat";
    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((chatroomusers) => {
      console.log("info of chatroomid and its users:", chatroomusers);

      chatroomusers.forEach((obj) => {
        if (obj.user_id === this.props.currentUserId)
          return this.setState({
            chatname: obj.name
          })
      })
    
      const self = this;
      this.createNameSpace(chatroomusers, self)
    });
  }

  createNameSpace(chatroomusers, self) {
    chatroomusers.forEach((chatroom) => {
      if (chatroom.user_id === this.props.currentUserId) {
        var s = io.connect(`http://localhost:3000/group-${chatroom.chatroom_id}`);
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

  // This function will send content & currentUser to server
  // This message will have an incomingMessage type
  onNewPost(content) {
    const newMessage = { username: this.props.currentUsername, content: content, currentUserFlairs: this.props.currentUserFlairs};
    newMessage.type = "incomingMessage";
    console.log("socket is:",this.state.socket)
    console.log("the message sent is", newMessage)
    const nsp = this.state.socket
    nsp.emit('message', JSON.stringify(newMessage));
  }

  // Render page and pass in data from props
  render() {
    return (
      <div>
        <ChatNav clientCount={this.state.clientCount} chatname={this.state.chatname} />
        <MessageList messages={this.state.messages} type={this.state.type} currentUser={this.props.currentUsername} />
        <ChatBar currentUser={this.props.currentUsername}  onNewPost={this.onNewPost} />
      </div>
    );
  }
}
export default ChatRooms;
