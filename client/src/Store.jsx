import React from 'react';

class Store extends React.Component {
  constructor(){
    super();
    this.state = {
      flairs: []
    }
  }

   componentDidMount() {
    this.getFlairs();
  }
  
  uuid() {
    return Math.random().toString(36).substr(2, 6);
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
          flairs
        });
      });
  }
    
  render() {
    const flairs = this.state.flairs.map((flair) => { 
      if (this.props.currentUserRep >= flair.cost) { 
        return (
          <div className="product" key={ flair.id }>
            <p className="product-name">{flair.name}</p>
            <img key={this.uuid()} src= {flair.image} height="100" width="100" />
            <p className="product-cost">cost: {flair.cost} reps</p>
              <form action="/flairs" method="POST">
                <input type='hidden' name='currentUserId' value={this.props.currentUserId} />
                <input type='hidden' name='currentUserRep' value={this.props.currentUserRep} />
                <input type='hidden' name='flairId' value={flair.id} />
                <input type='hidden' name='flairCost' value={flair.cost} />
                <input className="buy-product" type='submit' value='Buy' />
              </form>
          </div>
        );
      } else {
        return (
          <div className="product" key={ flair.id }>
            <p className="product-name">{flair.name}</p>
            <img key={this.uuid()} src={flair.image} height="100" width="100" />
            <p className="product-cost">cost: {flair.cost} reps</p>
            <p className="soldout"> You can't afford this! </p>
          </div>
        );
      }
    });

    return(
      <div className="products">
          {flairs}
      </div>
    );
  }
}

export default Store;
