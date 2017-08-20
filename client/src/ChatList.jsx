import React from 'react';

class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      ChatList: []
    }
    this.onSubmit = this.handleSubmit.bind(this);
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
    this.getChatList();
  }
  
  handleSubmit(event) {
    // event.preventDefault();
    const chatname = event.target.elements[0].value;
    const body = JSON.stringify({ chatname: chatname, currentUserId: this.props.currentUserId });
    const url = "/chatList"
      fetch(url, {      
        method: "POST",
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Content-Length": new Buffer(body).length},
          body: body
        }).then((response) => {
          return response.json()
        }).then((newchatlist) => {
          console.log("new chat list:", newchatlist)
          this.setState({
            chatList: newchatlist
          })
          console.log(this.state)
        })
  }

  render() {
    let position = 0;
    const ChatList = this.state.ChatList.map((chatList) => {
      position++;
      return (
        <div key={chatList.name}>
          {position}. {chatList.name}
        </div>
      );
    });

    return (
      <div className="ChatList">
        <p>ChatList</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Name your Chat topic!" />
          <button>"Create"</button>
        </form>
        {ChatList}
      </div>
    );
  }
}

export default ChatList;
