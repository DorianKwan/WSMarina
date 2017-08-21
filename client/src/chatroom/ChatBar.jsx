import React, { Component } from 'react';

// Class ChatBar has event-handling for user inputs
class ChatBar extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      content: ''
    }

    this.onContentChange = this.onContentChange.bind(this);
    this.onContentKeyup = this.onContentKeyup.bind(this);
  }

  // Event-handler function for onChange event
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  // Event-handler function for Enter key-up in Charbar-message field
  onContentKeyup(event) {
    if (event.key === 'Enter') {
      this.props.onNewPost(this.state.content);
      this.setState({ content: '' });
    }
  }

  // Renders chat-bar of page
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onContentChange} onKeyUp={this.onContentKeyup} />
      </footer>
    );
  }
}
export default ChatBar;