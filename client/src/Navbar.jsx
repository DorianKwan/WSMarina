import React from 'react';

class Navbar extends React.Component {
  render() { 

    return (
      <div className="navbar">
        <section className="logo">W.S. MARINA</section>
        <span id="store">STORE</span>
        <span id="farm">FARM</span>
        <span id="bets">BETS</span>
      </div>
    );
  }
}

export default Navbar;
