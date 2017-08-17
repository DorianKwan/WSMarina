import React from 'react';

class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      avatarUrl:'',
      bio:'',
    }
  }
  getInitialState: function(params) {
    return {
      users: {}
    }
  }

  componentDidMount() {
  }
  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    const body = JSON.stringify({email: email, password: password});

    fetch("", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body: body
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert("profile updated!");
      }  
    });
  },

  render() {
    return (
      <div>
        <div className="profile-form">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="email"/> {" "}
            <input type="password" placeholder="password"/>{" "}
            <button type="submit">Log in</button>
          </form>
        </div>
        <div className="profile-content">
          <Image src={this.state.image} />
          <Profile person={this.state.person} quote={this.state.quote} />
        </div>
      </div>
      <div className="ProfilePage">
        <h2>ProfilePage</h2>
        <div>
          <img src={this.state.avatarURL}/> 
        </div>
         </div>
      </div>
    );
  }
}

export default ProfilePage;

