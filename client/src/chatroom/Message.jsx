import React, { Component } from "react";


class Message extends Component {
  renderMessage() {
    switch (this.props.type) {
      case "nameChange":
        return (<span className="message-content system-message">{this.props.content}</span>);
      default:
        return (<span className="message-content">{this.props.content}</span>);
    }
  }

  renderUsername() {
    switch (this.props.color) {
      case "chatty":
        return (<span className="message-username" style={{ color: "#19c5eb" }}>{this.props.username}</span>);
      default:
        return (<span className="message-username" style={{ color: this.props.color }}>{this.props.username}</span>);
    }
  }

  render() {
    return (
      <div className="message">
        {this.renderUsername()}
        {this.renderMessage()}
      </div>
    );
  }
}

export default Message;