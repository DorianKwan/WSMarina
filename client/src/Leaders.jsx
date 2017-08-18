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
    const leaders = this.state.leaders.map((leader) => { 
      return (
        <div>
          <ol>
            <li>{leader.name}</li>
          </ol>
        </div>
      );
    
      return (
        <div>
          <p>Top 10 Leaders</p>
          <p>{leaders}</p>
        </div>
      );
    });

    return(
      <div className="store">
          {flairs}
      </div>
    );
  }
}

export default Leaders;
