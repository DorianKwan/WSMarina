import React from 'react';

class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      avatarUrl:'',
      bio:'',
    }
  }
  render() {
    return (
      <div className="ProfilePage">
        <h2>ProfilePage</h2>

      </div>
    );
  }
}

export default ProfilePage;

