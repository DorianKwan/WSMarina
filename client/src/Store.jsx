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
        console.log("test kai", this.state.flairs);
      });
  }

  componentDidMount() {
    this.getFlairs();
  }
  render() {
    const flairs = this.state.flairs.map((flair) => { 
      return (
        <div>
          <p>{flair.name}</p>
          <img src= {flair.image}/>
          <p>cost: {flair.cost} points</p>
        </div>
      );
    })

  return(
    <div className="store">
        {flairs}
    </div>
  )
  }
}

export default Store;
