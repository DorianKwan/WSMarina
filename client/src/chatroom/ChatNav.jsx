import React, { Component } from 'react';

// Class chatNav renders nav-bar of page which includes logo and count of online users
class ChatNav extends Component {
  render() {
    if (this.props.chatname) {
      return (
        <nav className="chatNav">
          <span>TOPIC: {this.props.chatname} </span>
          <span className="online-users">{this.props.clientCount} users online</span>
        </nav>
      )
    } else {
        return (
          <nav className="chatNav"></nav>
        )
    }
  }
}

export default ChatNav;