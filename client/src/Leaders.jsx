import React from 'react';

class Leaders extends React.Component {
  constructor(){
    super();
    this.state = {
      leaders: []
    }
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
    })
      .then((response) => {
        return response.json();
      })
      .then((leaders) => {
        this.setState({
          leaders
        });
      });
  }
  componentDidMount() {
    this.getLeaders();
  }

  render() {
    let position = 0;
    const leaders = this.state.leaders.map((leader) => { 
      position++;
      return (
        <div key={leader.username}>
          &ensp; {position}. {leader.username} : {leader.rep} reps
        </div>
      );
    });
    
    const flairs = this.props.currentUserFlairs.map((flair) => { 
      return (
        <img key={this.uuid()} src={flair.image} height="20" width="20" />
      );
    }); 
    
    return (
      <div className="leaders">
        <div className="coverPhoto" />
        <section className="sideProfile">
          <img id="currentUserImage" src={this.props.currentUserImage} />
          <div id="currentUserTitle">{this.props.currentUserTitle}</div> 
          <div id="currentUsername">{this.props.currentUsername}</div> 
          <div id="bio">Bio: {this.props.currentUserBio}</div>
          <div id="email">Email: {this.props.currentUserEmail}</div>
          <div id="currentUserFlairs">Flairs: {flairs}</div>
          <div id="currentUserReps">Reps: {this.props.currentUserRep}</div>
        </section>
        <section className="leaderTitle">Top 10 Leaders</section>
        <ul>
          <li>{leaders}</li>
        </ul>
      </div>
    );
  }
}

export default Leaders;
