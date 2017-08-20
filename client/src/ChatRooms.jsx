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
      currentUser: "",
      currentUserId: "",
      currentUserFlairs: "",
      messages: [],
      clientCount: 0,
    }

    this.onNewPost = this.onNewPost.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      currentUser: this.props.currentUsername,
      currentUserFlairs: this.props.currentUserFlairs,
      currentUserId: this.props.currentUserId
    })
  }

  componentDidMount() {
    const self = this;
    this.socket = io.connect("http://localhost:3000");
    this.socket.on('data', function (event) {
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
    });
  }

  // This function will send content & currentUser to server
  // This message will have an incomingMessage type
  onNewPost(content) {
    const newMessage = { username: this.state.currentUser, content: content, currentUserFlairs: this.state.currentUserFlairs};
    const currentUser = this.state.currentUser;
    newMessage.type = "incomingMessage";
    this.socket.emit('message', JSON.stringify(newMessage));
  }

  // Render page and pass in data from props
  render() {
    return (
      <div>
        <ChatNav clientCount={this.state.clientCount} />
        <MessageList messages={this.state.messages} type={this.state.type} currentUser={this.state.currentUser} />
        <ChatBar currentUser={this.state.currentUser}  onNewPost={this.onNewPost} />
      </div>
    );
  }
}
export default ChatRooms;