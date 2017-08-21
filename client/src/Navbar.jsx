import React from 'react';

class Navbar extends React.Component {
  render() {

    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item is-tab is-active"> &nbsp; HOME</a>
            <a className="nav-item is-tab"> &nbsp; FARM</a>
            <a className="nav-item is-tab"> &nbsp; BETS</a>
            <a className="nav-item is-tab"> &nbsp; STORE</a>
          </div>

          <div className="nav-right nav-menu">
            <a className="nav-item" id="site-name"> W.S. MARINA</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
