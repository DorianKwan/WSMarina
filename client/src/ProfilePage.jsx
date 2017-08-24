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

    const flairs = this.props.currentUserFlairs.map((flair) => { 

      return (
        <div>
          <img key={this.uuid()} id="flairImage" src={flair.image} height="20" width="20" />
          <span>
            <form onSubmit={this.callDeleteFlair}>
              <input type="hidden" name="flairId" value={flair.flair_id} />
              <input type="hidden" name="Id" value={flair.id} />
              <input type="hidden" name="userId" value={flair.user_id} />
              <button>Delete Flair</button>
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
                <td>Username:</td> 
                <td>{this.props.currentUsername }</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>{this.props.currentUserBio}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{this.props.currentUserEmail}</td>
              </tr>
              <tr>
                <td>Title:</td>
                <td>{this.props.currentUserTitle}</td>
              </tr>
              <tr>
                <td>Reputation:</td>
                <td>{this.props.currentUserRep}</td>
              </tr>
            </tbody>
          </table>
          <div id="currentUserFlairs">Flairs: {flairs}</div>
        {/* edit profile should only be visible when user_id matches visiting user */}
        {/* no defaults set for img and both forms are forced to be entered */}
        <div className="edit-profile">
          <form onSubmit={this.onProfile}>
            <input type="text" name="image" accept="image/*" placeholder="Insert avatar url here:"/>
            <input type="text" placeholder="Tell us about yourself:" />
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;

