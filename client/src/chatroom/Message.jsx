import React, { Component } from "react";


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flairs: null,
      currentUsername: null
    }
  }

  componentWillReceiveProps(){
    this.setState({
      flairs: this.props.flairs,
      currentUsername: this.props.username
    })

  }
  renderMessage() {
    switch (this.props.type) {
      case "nameChange":
        return (<span className="message-content system-message">{this.props.content}</span>);
      default:
        return (<span className="message-content">{this.props.content}</span>);
    }
  }

  renderUsername() {
    console.log("test if flairs gets set",this.state.flairs)
    console.log("test if username gets set", this.state.currentUsername)
    switch (this.props.color) {
      case "chatty":
        return (<span className="message-username" style={{ color: "#19c5eb" }}>{this.state.currentUsername}{this.state.flairs}</span>);
      default:
        return (<span className="message-username" style={{ color: this.props.color }}>{this.state.currentUsername}{this.state.flairs}</span>);
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