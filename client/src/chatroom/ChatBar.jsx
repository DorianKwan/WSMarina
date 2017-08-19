import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatBar">
        <input className="chatBar-username" placeholder="Username (Optional)" defaultValue={this.props.username} onBlur={this.props.setUser} />
        <input className="chatBar-message" placeholder="Type something here" onKeyDown={this.props.sendMessage} />
        <button className="chatBar-button" onClick={this.props.buttonSendMessage}>Send</button>
        <button className="chatBar-button" onClick={this.props.clearHistory}>Clear</button>
      </footer>
    );
  }
}

export default ChatBar;