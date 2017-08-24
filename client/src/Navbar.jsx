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
        <ProfileModal currentUserFlairs={this.props.currentUserFlairs}/>
        <FarmModal defaultValue={this.props.defaultValue} setFarm={this.props.setFarm} />
        <BetsModal findUser={this.props.findUser} currentUserRep={this.props.currentUserRep} />
        <StoreModal buyFlairs={this.props.buyFlairs} currentUsername={this.props.currentUsername} currentUserId={this.props.currentUserId} currentUserRep={this.props.currentUserRep} />
      </div>
    );
  }
}

export default Navbar;
