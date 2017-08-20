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
            <span className="message-userFlairs">{this.props.message.currentUserFlairs}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        );
        break;
      default:
        console.log("Error in message");
        return (<div></div>);
        break;
    }
  }
}
export default Message;