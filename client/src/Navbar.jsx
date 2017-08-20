import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <header>
          <nav>
            <ul>
              <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Anchor_pictogram_yellow.svg/845px-Anchor_pictogram_yellow.svg.png" id="logo" /></li>
              <li><a>PROFILE</a></li>
              <li><a>FARM</a></li>
              <li><a>BETS</a></li>
              <li><a>STORE</a></li>
              <li><a>HOME</a></li>          
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Navbar;
