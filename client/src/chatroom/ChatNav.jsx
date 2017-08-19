
import React, { Component } from "react";

class ChatNav extends Component {
  renderUserCount() {
    switch (this.props.userCount) {
      case 1:
        return (<span className="user-count">1 user online</span>);
      default:
        return (<span className="user-count">{this.props.userCount} users online</span>);
    }
  }

  render() {
    return (
      <nav className="chatNav">
        <a href="/" className="chatNav-brand">Chatty</a>
        {this.renderUserCount()}
      </nav>
    );
  }
}

export default ChatNav;