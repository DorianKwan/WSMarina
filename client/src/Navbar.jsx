import React from 'react';
import ProfileModal from './ProfileModal.jsx';
import FarmModal from './FarmModal.jsx';
import StoreModal from './StoreModal.jsx';
import BetsModal from './BetsModal.jsx';

class Navbar extends React.Component {
  render() { 
    return (
      <div className="navbar">
        <span id="logo">W . S . &ensp; M A R I N A</span>
        <form action="/logout" method="POST">
            <input className="logout" type='submit' value='LOGOUT' />
        </form>
        <ProfileModal 
          deleteFlair={this.props.deleteFlair} 
          currentUsername={this.props.currentUsername}
          currentUserRep={this.props.currentUserRep}
          currentUserFlairs={this.props.currentUserFlairs}
          currentUserImage={this.props.currentUserImage}
          currentUserEmail={this.props.currentUserEmail}
          currentUserTitle={this.props.currentUserTitle}
          currentUserBio={this.props.currentUserBio}
          profileSubmit={this.props.profileSubmit}
        />
        <FarmModal defaultValue={this.props.defaultValue} setFarm={this.props.setFarm} />
        <BetsModal findUser={this.props.findUser} currentUserRep={this.props.currentUserRep} />
        <StoreModal buyFlairs={this.props.buyFlairs} currentUsername={this.props.currentUsername} currentUserId={this.props.currentUserId} currentUserRep={this.props.currentUserRep} />
      </div>
    );
  }
}

export default Navbar;
