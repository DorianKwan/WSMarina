import React from 'react';

class Store extends React.Component {
  constructor(){
    super()
    this.state = {
      flairs: []
    }
  }
  getFlairs() {
    //For Localhost use the below url
    const url = "/flairs";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((flairs) => {
        this.setState({
          flairs: flairs
        });
      });
  }

  componentDidMount() {
    this.getFlairs();
  }
  render() {
    const flairs = this.state.flairs.map((flair) => { 
      if (this.props.currentUserRep >= flair.cost) { 
        return (
          <div key={ flair.id }>
            <p>{flair.name}</p>
            <img src= {flair.image} height="100" width="100" />
            <p>cost: {flair.cost} points</p>
            <form action="/flairs" method="POST">
              <input type='hidden' name='currentUserId' value={this.props.currentUserId} />
              <input type='hidden' name='currentUserRep' value={this.props.currentUserRep} />
              <input type='hidden' name='flairId' value={flair.id} />
              <input type='hidden' name='flairCost' value={flair.cost} />
              <input type='submit' value='Purchase' />
            </form>
          </div>
        );
      } else {
        return (
          <div key={ flair.id }>
            <p>{flair.name}</p>
            <img src={flair.image} height="100" width="100" />
            <p>cost: {flair.cost} points</p>
            <p> You can't afford this! </p>
          </div>
        );
      }
    });

    return(
      <div className="store">
          {flairs}
      </div>
    );
  }
}

export default Store;
