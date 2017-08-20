import React from 'react';

class Navbar extends React.Component {
  render() {

    const flairs = this.props.currentUserFlairs.map((flair) => { 
      return (
        <img src= {flair.image} height="30" width="30" />
      );
    });

    return (
      <div className="navbar">
        <h1 className="logo">W.S. Marina</h1>
        <span>Welcome!!! {this.props.currentUsername} {flairs}</span>
        <span>Reps: {this.props.currentUserRep}</span>
      </div>
    );
  }
}

export default Navbar;
