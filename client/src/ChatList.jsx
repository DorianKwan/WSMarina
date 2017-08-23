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
            <div key={chatList.name}>
              <span>{position}. {chatList.name}</span>
              <span>
                <form onSubmit={this.joinChat}>
                  <input type="hidden" name="chatroomid" value={chatList.id}/>
                  <button>Join Chat</button>
                </form>
                <form onSubmit={this.hideChat}>
                  <input type="hidden" name="chatroomid" value={chatList.id} />
                  <button>Delete Chat</button>
                </form>
              </span>
            </div>
          );
        } else {
          return (
            <div key={chatList.name}>
              <span>{position}. {chatList.name}</span>
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
        <p>ChatList</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Name your Chat topic!" />
          <button>Create</button>
        </form>
        {ChatList}
      </div>
    );
  }
}

export default ChatList;
