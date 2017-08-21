import React, { Component } from 'react';

// Class chatNav renders nav-bar of page which includes logo and count of online users
class ChatNav extends Component {
  render() {
    if (this.props.chatname) {
      return (
        <nav className="chatNav">
          <a href="/" className="chatNav-brand">W.S Marina </a>
          <a>Topic: {this.props.chatname} </a>
          <span className="online-users">{this.props.clientCount} users online</span>
        </nav>
      )
    } else {
        return (
          <nav className="chatNav">
            <a href="/" className="chatNav-brand">W.S Marina </a>
          </nav>
        )
    }
  }
}

export default ChatNav;