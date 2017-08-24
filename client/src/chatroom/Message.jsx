import React, { Component } from 'react';

// Class Message renders new message
class Message extends Component {

  uuid() {
    return Math.random().toString(36).substr(2, 6);
  }

  render() {

    const flairs = this.props.message.currentUserFlairs.map((flair) => {
      return(
        <img id="flair" key={this.uuid()} src={flair.image} height="23" width="23" />
      )
    })
    switch (this.props.message.type) {
      // If incomingMessage, render message with username and messsage content
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-userFlairs">{flairs} &ensp; &ensp;</span>
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