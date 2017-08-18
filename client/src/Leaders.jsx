import React from 'react';

class Leaders extends React.Component {
  constructor(){
    super()
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
          leaders: leaders
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
          {position}. {leader.username} [reps: {leader.rep}]
        </div>
      );
    });
    
    return (
      <div className="leaders">
        <p>Top 10 Leaders</p>
        {leaders}
      </div>
    );
  }
}

export default Leaders;
