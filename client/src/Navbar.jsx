import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul className="brand-name">
          <li>WS MARINA</li>
            
        </ul>
        <ul>
          {/* <span><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/8089-200.png" classname="icon" /></span> */}
          <li><a>PROFILE</a></li>
          <li><a>FARM</a></li>
          <li><a>BETS</a></li>
          <li><a>STORE</a></li>
          <li><a>HOME</a></li>          
        </ul>
      </div>
    );
  }
}

export default Navbar;
