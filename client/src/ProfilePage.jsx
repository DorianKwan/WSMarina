import React from 'react';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      bio: '',
      username: '',
      rep: '',
      email: '',
      flairs: ''
    }
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch("/profile", {
      method: "GET",
      credentials: 'include'
    })
      .then((response) => {
        console.log("response ", response);
        return response.json();
      }).then((userInfo) => {
        this.setState({
          image: userInfo.image,
          bio: userInfo.bio,
          username: userInfo.username,
          rep: userInfo.rep,
          email: userInfo.email,
          flairs: this.props.currentUserFlairs
        });
      }).catch(function (error) {
        console.log("error ", error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const image = event.target.elements[0].value;
    const bio = event.target.elements[1].value;
    const body = JSON.stringify({ image: image, bio: bio });

    fetch("/profile", {
      method: "PUT",
      credentials: 'include',
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
      <div className="user-profile">
        <h1> Profile Information</h1>
        <img className="user-avatar" src={this.state.image} />
        <div className="username">{this.state.username}</div>
        <div className="bio">{this.state.bio}</div>
        <div className="personal-data">
          <span class="profile-details">Profile Details</span>
        </div>
        <div className="details-table">
          <tr>
            <td>Email</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Reputation</td>
            <td>{this.state.rep}</td>
          </tr>
        </div>
        {/* edit profile should only be visible when user_id matches visiting user */}
        {/* no defaults set for img and both forms are forced to be entered */}
        <div className="edit-profile">
          <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="image" ref="image" />
            <input type="text" placeholder="bio" ref="bio" />
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;

