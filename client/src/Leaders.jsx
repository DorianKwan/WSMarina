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
        <div key={leader.username}>
          {position}. {leader.username} : {leader.rep} reps
        </div>
      );
    });
    
    return (
      <div className="leaders">
        <h2>Top 10 Leaders</h2>
        <ul>
          <li>{leaders}</li>
        </ul>
      </div>
    );
  }
}

export default Leaders;
