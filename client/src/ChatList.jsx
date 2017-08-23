import React from 'react';

class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      ChatList: []
    }
    this.onSubmit = this.callHandleSubmit.bind(this);
    this.joinChat = this.callJoinChat.bind(this);
    this.hideChat = this.callHideChat.bind(this);
  }
  
  callHideChat(event) {
    event.preventDefault();
    const chatroomId = event.target.elements[0].value;
    this.props.hideChat(chatroomId);
  }

  callHandleSubmit(event) {
    event.preventDefault();
    const chatname = event.target.elements[0].value;
    this.props.handleSubmit(chatname);
    event.target.elements[0].value = "";
  }

  callJoinChat(event) {
    event.preventDefault();
    const chatroomId = event.target.elements[0].value;
    this.props.joinChat(chatroomId);
  }

  render() {
    let position = 0;
    const ChatList = this.props.chatList.map((chatList) => {
      if (chatList.isActive) {
        position++;
        if (chatList.user_id === this.props.currentUserId) {
          return (
            <div className="each-chatList" key={chatList.name}>
              <span className="chatlist-position">{position}. {chatList.name}</span>
              <span>
                <form onSubmit={this.hideChat}>
                  <input type="hidden" name="chatroomid" value={chatList.id} />
                  <button id="delete-button">❌</button>
                </form>
                <form onSubmit={this.joinChat}>
                  <input type="hidden" name="chatroomid" value={chatList.id}/>
                  <button id="join-button">Join Chat</button>
                </form>
              </span>
            </div>
          );
        } else {
          return (
            <div className="each-chatList" key={chatList.name}>
              <span className="chatlist-position">{position}. {chatList.name}</span>
              <span>
                <form onSubmit={this.joinChat}>
                  <input type="hidden" name="chatroomid" value={chatList.id} />
                  <button>Join Chat</button>
                </form>
              </span>
            </div>
          );
        }
      } else {
        return;
      }
    });

    return (
      <div className="chatList">
        <span id="title">CHAT LIST</span>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Name your Chat topic" />
          <button id="create-chat-button">Create</button>
        </form>
        <div className="all-chatLists">
          {ChatList}
        </div>
      </div>
    );
  }
}

export default ChatList;
