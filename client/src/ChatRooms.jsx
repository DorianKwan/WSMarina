import React, { Component } from "react";

import ChatNav from "./chatroom/ChatNav.jsx";
import MessageList from "./chatroom/MessageList.jsx";
import ChatBar from "./chatroom/ChatBar.jsx";

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:"",
      userCount: 0,
      messages: [
        {
          id: 0,
          color: "chatty",
          content: "Welcome to W.S. Marina!",
          username: "Kai",
        }
      ],
      notificationSound: new Audio("https://notificationsounds.com/message-tones/get-outta-here-505/download/mp3"),
      sendMessage: (content) => {
        if (content.keyCode === 13) {
          const newMessage = {
            username: this.state.currentUser,
            content: content.target.value,
            type: "textMessage"
          };

          if (newMessage.content) {
            this.state.socket.emit('message', JSON.stringify(newMessage));
            content.target.value = "";
          }
        }
      },
      buttonSendMessage: () => {
        const newMessage = {
          username: this.state.currentUser,
          content: document.getElementsByClassName("chatBar-message")[0].value,
          type: "textMessage"
        };

        if (newMessage.content) {
          this.state.socket.emit('message', JSON.stringify(newMessage));
          document.getElementsByClassName("chatBar-message")[0].value = "";
        }
      },
      clearHistory: () => {
        this.setState({ messages: [] });
      },
      socket: io.connect("http://localhost:3000")
    };
    const self = this
    this.state.socket.on('data', function (msg) {
      const newMessage = JSON.parse(msg);
      self.setState({ userCount: newMessage.content })
    }) 
    this.state.socket.on('message', function (msg) {
      const newMessage = JSON.parse(msg);
      const messages = self.state.messages.concat(newMessage);
      switch (newMessage.type) {
        case "textMessage":
          self.state.notificationSound.play();
          self.setState({ messages: messages });
          break;
      }
      if (newMessage.type === "textMessage") {
        this.state.notificationSound.play();
      }
    });
  }

  // componentDidMount() {
  //   console.log("Simulating incoming message");
  //   setTimeout(() => {
  //     const newMessage = { id: 3, username: "Michelle", content: "Hello there!"} ;
  //     const messages = this.state.messages.concat(newMessage);
  //     this.setState({ messages: messages });
  //   }, 3000);
  // }

  componentWillReceiveProps(){
      this.setState({
        currentUser : this.props.currentUsername
      })
    }
  render() {
    return (
      <div>
        <ChatNav userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser} sendMessage={this.state.sendMessage} buttonSendMessage={this.state.buttonSendMessage} clearHistory={this.state.clearHistory} />
      </div>
    );
  }
}

export default ChatRooms;