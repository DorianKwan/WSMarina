import React from 'react';

class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      ChatList: []
    }
  }
  getChatList() {
    //For Localhost use the below url
    const url = "/ChatList";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((ChatList) => {
        this.setState({
          ChatList: ChatList
        });
      });
  }
  componentDidMount() {
    console.log("currentUser", this.props.currentUsername)
    console.log("currentUserId", this.props.currentUserId)
    this.getChatList();
  }

  render() {
    let position = 0;
    const ChatList = this.state.ChatList.map((chatList) => {
      position++;
      return (
        // <div key={leader.username}>
        //   {position}. {leader.username} [reps: {leader.rep}]
        // </div>
      );
    });

    return (
      <div className="ChatList">
        <p>ChatList</p>
        {ChatList}
      </div>
    );
  }
}

export default ChatList;
