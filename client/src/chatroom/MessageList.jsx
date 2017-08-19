
import React, { Component } from "react";

import Message from "./Message.jsx";

class MessageList extends Component {
  componentDidUpdate() {
    window.scrollTo(0, document.querySelector(".messages").scrollHeight);
  }

  render() {
    const listMessages = this.props.messages.map(message =>
      <Message key={message.id} username={message.username} content={message.content} type={message.type} color={message.color} />
    );
    return (
      <main className="messages">
        {listMessages}
      </main>
    );
  }
}

export default MessageList;