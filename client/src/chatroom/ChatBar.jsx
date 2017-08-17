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
    this.onUserChange = this.onUserChange.bind(this);
    this.onUserBlur = this.onUserBlur.bind(this);
    this.onUserKeyup = this.onUserKeyup.bind(this);
  }

  // Event-handler function for onChange event
  onUserChange(event) {
    this.setState({ user: event.target.value });
  }

  // Event-handler function for onBlur event
  onUserBlur(event) {
    this.props.onNewName(this.state.user);
    this.setState({ user: event.target.value });
  }

  // Event-handler function for Enter key-up Charbar-username field
  onUserKeyup(event) {
    if (event.key === 'Enter') {
      this.props.onNewName(this.state.user);
    }
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
        <input className="chatbar-username" placeholder="Enter username" value={this.state.user} onBlur={this.onUserBlur} onChange={this.onUserChange} onKeyUp={this.onUserKeyup} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onContentChange} onKeyUp={this.onContentKeyup} />
      </footer>
    );
  }
}
export default ChatBar;