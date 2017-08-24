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
        <div className="eachLeader" key={leader.username}>
          &ensp; {position}. {leader.username} <span id="leaderRep">{leader.rep} reps</span>
        </div>
      );
    });
    
    return (
      <div className="leaders">
        <div className="coverPhoto" />
        <img id="profile-anchor" src="http://flaticons.net/icons/Transportation/Anchor-01.png" alt="anchor-icon" height="20" width="20" />
        <section className="sideProfile">
          <img id="currentUserImage" src={this.props.currentUserImage} />
          <div id="currentUserTitleRep">{this.props.currentUserTitle} ∙ {this.props.currentUserRep} reps</div> 
          <div id="currentUserName">{this.props.currentUsername}</div>
        </section>
        <section className="leaderTitle">TOP 10 LEADERS</section>
        <img id="leader-anchor" src="http://flaticons.net/icons/Transportation/Anchor-01.png" alt="anchor-icon" height="20" width="20" />
        <ul>
          <li>{leaders}</li>
        </ul>
      </div>
    );
  }
}

export default Leaders;
