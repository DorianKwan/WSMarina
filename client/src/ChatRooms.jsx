import React, { Component } from "react";

import ChatNav from "./chatroom/ChatNav.jsx";
import MessageList from "./chatroom/MessageList.jsx";
import ChatBar from "./chatroom/ChatBar.jsx";

class ChatRooms extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        name: ""
      },
      lastUser: {
        name: ""
      },
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
            username: this.state.currentUser.name || "Anonymous",
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
          username: this.state.currentUser.name || "Anonymous",
          content: document.getElementsByClassName("chatBar-message")[0].value,
          type: "textMessage"
        };

        if (newMessage.content) {
          this.state.socket.emit('message', JSON.stringify(newMessage));
          document.getElementsByClassName("chatBar-message")[0].value = "";
        }
      },
      setUser: (content) => {
        const currentUser = this.state.currentUser;
        const newUser = { name: content.target.value };

        if (currentUser.name !== newUser.name) {
          const message = {
            username: "Chatty",
            content: `${currentUser.name || "Anonymous"} has set username to ${newUser.name || "Anonymous"}`,
            type: "nameChange"
          };

          this.state.socket.emit('message', JSON.stringify(message))
          this.setState({ lastUser: currentUser });
          this.setState({ currentUser: newUser });
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
        case "nameChange":
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

  render() {
    return (
      <div>
        <ChatNav userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} sendMessage={this.state.sendMessage} setUser={this.state.setUser} buttonSendMessage={this.state.buttonSendMessage} clearHistory={this.state.clearHistory} />
      </div>
    );
  }
}

export default ChatRooms;