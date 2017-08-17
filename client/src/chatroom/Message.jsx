import React, { Component } from 'react';

// Class Message renders new message
class Message extends Component {
  render() {
    switch (this.props.message.type) {
      // If incomingMessage, render message with username and messsage content
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        );
        break;
      // If incomingNotification, will render notification message about username change
      case "incomingNotification":
        return (
          <div className="message-system">
            {this.props.message.oldName} changed their name to {this.props.message.newName}
          </div>
        );
        break;
      // Should not reach default due to filter in MessageList
      // But if so returns error and empty div
      default:
        console.log("Error in message");
        return (<div></div>);
        break;
    }
  }
}
export default Message;