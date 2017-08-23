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
      messages: [],
    }
  }

  // Render page and pass in data from props
  render() {
    return (
      <div className="chatRoom">
        <ChatNav clientCount={this.props.clientCount} chatname={this.props.chatname} />
        <MessageList messages={this.props.messages} type={this.state.type} currentUser={this.props.currentUsername} currentUserFlairs={this.props.currentUserFlairs} />
        <ChatBar currentUser={this.props.currentUsername}  onNewPost={this.props.onNewPost} />
      </div>
    );
  }
}
export default ChatRooms;
