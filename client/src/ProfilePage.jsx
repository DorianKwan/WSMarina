import React from 'react';

class ProfilePage extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      avatarUrl:'',
      bio:'',
    }
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    const body = JSON.stringify({avatarUrl: avatarUrl, bio: bio});

    fetch("/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body: body
    })
    .then((response) => {
      return response.json()
    }).then((body) => {
      console.log(body);
    });
  }

  render() {
    return (
      <div>
        <p> profile page</p>
        <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="avatarURL" ref="avatarURL"/>
        <input type="text" placeholder="bio" ref="bio"/>
        <input type="submit" />
      </form>
      </div>
    );
  }
}

export default ProfilePage;

