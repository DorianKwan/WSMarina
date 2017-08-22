import React from 'react';
import ProfileModal from './ProfileModal.jsx';
import FarmModal from './FarmModal.jsx';
import StoreModal from './StoreModal.jsx';

class Navbar extends React.Component {
  render() { 
    return (
      <div className="navbar">
        <span id="logo">W.S. MARINA</span>
        <form action="/logout" method="POST">
            <input className="logout" type='submit' value='LOGOUT' />
        </form>
        <ProfileModal />
        <FarmModal defaultValue={this.props.defaultValue} setFarm={this.props.setFarm} />
        <StoreModal currentUsername={this.props.currentUsername} currentUserId={this.props.currentUserId} currentUserRep={this.props.currentUserRep} />
      </div>
    );
  }
}

export default Navbar;
