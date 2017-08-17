import React from 'react';

class Navbar extends React.Component {
  componentDidMount(){
    fetch('http://localhost:8080/currentUser', {
      method: "POST",
      credentials: "include",

    })
  }
  render() {
    return (
      <div className="navbar">Navbar</div>
    );
  }
}

export default Navbar;
