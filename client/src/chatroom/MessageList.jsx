
import React, { Component } from "react";

import Message from "./Message.jsx";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flairs: null
    }
  }

  componentWillReceiveProps() {
    window.scrollTo(0, document.querySelector(".messages").scrollHeight);
    this.setState({
      flairs: this.props.flairs
    })
  }

  render() {
    const listMessages = this.props.messages.map(message =>
      <Message key={message.id} username={message.username} content={message.content} type={message.type} color={message.color} flairs={this.props.flairs} />
    );
    return (
      <main className="messages">
        {listMessages}
      </main>
    );
  }
}

export default MessageList;