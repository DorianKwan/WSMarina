import React from 'react';

class Leaders extends React.Component {
  constructor(){
    super();
    this.state = {
      leaders: []
    }
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
        <div>
          &ensp; {position}. {leader.username} : {leader.rep} reps
        </div>
      );
    });
    
    const flairs = this.props.currentUserFlairs.map((flair) => { 
      return (
        <img src={flair.image} height="30" width="30" />
      );
    }); 

    return (
      <div className="leaders">
        <section className="userProfile">
          <img id="currentUserImage" src="https://pbs.twimg.com/profile_images/831993825635745796/HnVmB0-k.jpg" />
          <div id="currentUsername"> {this.props.currentUsername}</div> 
          <div id="currentUserFlairs">{flairs}</div>
          <div id="currentUserTitle">{this.props.currentUserTitle}</div> 
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
