import React from 'react';

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      bio: '',
      username: '',
      rep: '',
      email: '',
      flairs: ''
    }
    this.onProfile = this.callProfileSubmit.bind(this);
    this.callDeleteFlair = this.callDeleteFlair.bind(this);
  }
  
  uuid() {
    return Math.random().toString(36).substr(2, 6);
  }


  callProfileSubmit(event) {
    event.preventDefault();
    const image = event.target.elements[0].value;
    const bio = event.target.elements[1].value;
    const body = JSON.stringify({ image: image, bio: bio });
    event.target.elements[0].value = "";
    event.target.elements[1].value = "";
    this.props.profileSubmit(body);
  }

  callDeleteFlair(event) {
    event.preventDefault();
    const flairId = event.target.elements[0].value;
    const id = event.target.elements[1].value;
    const userId = event.target.elements[2].value;
    const body = JSON.stringify({ flairId: flairId, userId: userId, id: id });
    this.props.deleteFlair(body);
  }

  render() {

    let bio;
    if (this.props.currentUserBio === null) {
      bio = "No description yet";
    } else {
      bio = this.props.currentUserBio;
    }

    const flairs = this.props.currentUserFlairs.map((flair) => { 

      return (
        <div>
          <img key={this.uuid()} id="flairImage" src={flair.image} height="30" width="30" />
          <span>
            <form onSubmit={this.callDeleteFlair}>
              <input type="hidden" name="flairId" value={flair.flair_id} />
              <input type="hidden" name="Id" value={flair.id} />
              <input type="hidden" name="userId" value={flair.user_id} />
              <button id="delete-flair">Delete Flair</button>
            </form>
          </span>
        </div>
      );
    }); 

    return (
        <div className="profilePage">
          <table>
            <tbody>
              <tr>
              <td><img className="user-avatar" src={this.props.currentUserImage} /></td>
              </tr>
              <tr>
                <td>USERNAME:</td> 
                <td>{this.props.currentUsername }</td>
              </tr>
              <tr>
                <td>BIO:</td>
                <td>{bio}</td>
              </tr>
              <tr>
                <td>EMAIL:</td>
                <td>{this.props.currentUserEmail}</td>
              </tr>
              <tr>
                <td>TITLE:</td>
                <td>{this.props.currentUserTitle}</td>
              </tr>
              <tr>
                <td>REPUTATIONS:</td>
                <td>{this.props.currentUserRep}</td>
              </tr>
              <tr>
                <td>FLAIRS:</td>
                <td>{flairs}</td>
              </tr>
            </tbody>
          </table>
        <div className="edit-profile">
          <span>EDIT</span>
          <form onSubmit={this.onProfile}>
            <input type="text" name="image" accept="image/*" placeholder="Insert avatar url here"/>
            <input type="text" placeholder="Tell us about yourself" />
            <input id="submit-button" type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;

