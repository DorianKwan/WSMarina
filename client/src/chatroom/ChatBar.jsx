import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatBar">
        <input className="chatBar-message" placeholder={this.props.username} onKeyDown={this.props.sendMessage} />
        <button className="chatBar-button" onClick={this.props.buttonSendMessage}>Send</button>
        <button className="chatBar-button" onClick={this.props.clearHistory}>Clear</button>
      </footer>
    );
  }
}

export default ChatBar;