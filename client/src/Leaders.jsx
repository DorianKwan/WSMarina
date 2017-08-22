import React from 'react';

class Leaders extends React.Component {
  constructor(){
    super();
    this.state = {
      leaders: []
    }
  }
 
  componentDidMount() {
    this.getLeaders();
  }

  uuid() {
    return Math.random().toString(36).substr(2, 6);
  }

  getLeaders() {
    //For Localhost use the below url
    const url = "/leaders";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
        return response.json();
    }).then((leaders) => {
        this.setState({
          leaders
        });
    });
  }

  render() {
    let position = 0;
    const leaders = this.state.leaders.map((leader) => { 
      position++;
      return (
        <div className="eachLeader" key={this.uuid()}>
          &ensp; {position}. {leader.username} <span id="leaderRep">{leader.rep} reps</span>
        </div>
      );
    });
    
    return (
      <div className="leaders">
        <div className="coverPhoto" />
        <section className="sideProfile">
          <img id="currentUserImage" src={this.props.currentUserImage} />
          <div id="currentUserTitle">{this.props.currentUserTitle}</div> 
          <div id="currentUsername">{this.props.currentUsername}</div>
        </section>
        <section className="leaderTitle">TOP 10 LEADERS</section>
        <ul>
          <li>{leaders}</li>
        </ul>
      </div>
    );
  }
}

export default Leaders;
