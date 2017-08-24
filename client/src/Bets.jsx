import React, { Component } from 'react';

function calculatePercentChange(currentPrice, openingPrice) {
  return currentPrice > openingPrice ? ((currentPrice / openingPrice) - 1) * 100 : ((openingPrice / currentPrice) - 1) * -100;
}

function round(number, decimals) {
  return Number(Math.round(number + "e" + decimals) + "e-" + decimals).toFixed(2);
}

class Bets extends Component {

  constructor(props) {
    super(props);
    this.state = { direction: "" }
    this.makeBet = this.makeBet.bind(this);
    this.setTrue = this.setTrue.bind(this);
    this.setFalse = this.setFalse.bind(this);
    this.collect = this.collect.bind(this);
  }

  componentWillMount() {
    this.props.getBets;
    setInterval(this.props.getBets, 60000);
  }

  uuid() {
    return Math.random().toString(36).substr(2, 6);
  }

  makeBet(event) {
    event.preventDefault();
    const currentUserRep = event.target.elements[0].value;
    const ticker = event.target.elements[1].value;
    const wager = event.target.elements[2].value;
    const direction = event.target.elements[3].value;
    const bet = {
      currentUserRep,
      ticker,
      wager,
      direction
    }
    const body = JSON.stringify(bet);
    event.target.elements[1].value = ""
    event.target.elements[2].value = ""

    fetch("/bets", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body: body
    })
    .then((response) => {
      return response.text();
    }).then(() => {
      this.props.getBets();
    }).catch((error) => {
      console.log(error);
    });
  }

  collect(event) {
    event.preventDefault();
    const percentChange = event.target.elements[0].value;
    const wager = event.target.elements[1].value;
    const ticker = event.target.elements[2].value;
    const direction = event.target.elements[3].value;
    const currentUserRep = event.target.elements[4].value;
    const body = JSON.stringify({
      percentChange,
      wager,
      ticker,
      direction,
      percentChange,
      currentUserRep
    });

    fetch("/payout", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body,
    }).then((response) => {
      return response.text();
    }).then(() => {
      this.props.getBets();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  setTrue() {
    this.setState({ direction: true});
  }

  setFalse() {
    this.setState({ direction: false});
  }

  render() {

    const data = this.props || { bets: [{ticker: "Ticker Goes Here", wager: "Amount wagered here", direction: "Bull or Bear", start_price: "9.99", percentChange: "3.45"}]};
    const bets = data.bets.map((bet, index) => {
      if (!bet.collected_at) {
        return (
          <div key={this.uuid()}>
            <p>{ bet.ticker } | { bet.wager } | { bet.direction } | ${ bet.start_price } | { bet.percentChange }%</p>
            <br />
            <form onSubmit={this.collect}>
              <input name="percentChange" type="hidden" value={bet.percentChange} />
              <input name="wager" type="hidden" value={bet.wager} />
              <input name="ticker" type="hidden" value={bet.ticker} />
              <input name="direction" type="hidden" value={bet.direction} />
              <input name="currentUserRep" type="hidden" value={this.props.currentUserRep || undefined} />
              <input type="submit" value="Collect Rep"/>
            </form>
          </div>
        )
      } else {
        return (
          <div key={bet.ticker}>
            <p>{ bet.ticker } | { bet.wager } | { bet.direction } | ${ bet.start_price } | { bet.percentChange }% | { bet.payout }</p>
            <br />
          </div>
        )
      }
    });

    return (
      <section className="bets">
        <div>{ bets }</div>
        <br />
        <h2>Make a Prediction!</h2>
        <form onSubmit={this.makeBet}>
          <input name="currentUserRep" type="hidden" value={this.props.currentUserRep || undefined} />
          <label>Enter a Ticker: </label>
          <input name="ticker" />
          <br />
          <label>Enter Wager Amount: </label>
          <input name="wager" />
          <br />
          <label>Choose a direction: </label>
          <input name="direction" type="hidden" value={this.state.direction} />
          <input name="direction" type="submit" onClick={this.setTrue} value="Bull" style={{color: "rgb(233,182,50)"}}/>
          <input name="direction" type="submit" onClick={this.setFalse} value="Bear" style={{color: "rgb(15, 60, 77)"}} />
        </form>
      </section>
    );
  }
}

export default Bets;
