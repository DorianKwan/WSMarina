import React, { Component } from 'react';

// Class chatNav renders nav-bar of page which includes logo and count of online users
class ChatNav extends Component {
  render() {
    return (
      <nav className="chatNav">
        <a href="/" className="chatNav-brand">W.S Marina </a>
        <span className="online-users">{this.props.clientCount} users online</span>
      </nav>
    )
  }
}

export default ChatNav;