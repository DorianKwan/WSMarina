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
        <p>Welcome!!! {this.props.currentUsername} {flairs}</p>
        <p>Reps: {this.props.currentUserRep}</p>
      </div>
    );
  }
}

export default Navbar;
