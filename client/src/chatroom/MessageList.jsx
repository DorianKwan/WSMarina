import React, { Component } from 'react';
import Message from "./Message.jsx";

// Class MessageList renders all existing messages
class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="messages">
        {
          // Filter ensures that only messages with type incomingMessage or incomingNotification gets rendered
          this.props.messages
            .filter((m) => m.type === 'incomingMessage' || m.type === 'incomingNotification')
            .map(currentMessage => {
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