import React, { Component } from 'react';
import Message from "./Message.jsx";

// Class MessageList renders all existing messages
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom() {
    const scrollHeight = this.messages.scrollHeight;
    const height = this.messages.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <main className="messages" ref={(div) => {
          this.messages = div;
        }}>
        {
          // Filter ensures that only messages with type incomingMessage gets rendered
          this.props.messages
            .filter((m) => m.type === 'incomingMessage')
            .map(currentMessage => {
              console.log("currentMessage", currentMessage);
              return <Message
                message={currentMessage}
                key={currentMessage.id}
              />
            })
        }
      </main>
    );
  }
}
export default MessageList;