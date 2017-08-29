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
    alert("Bet was made !");
    if (ticker.length > 4) {
      event.target.elements[1].value = "";
      event.target.elements[2].value = "";
      alert("Ticker length must be 4 characters or less");
      return;
    }
    const wager = event.target.elements[2].value;
    if (Number(wager) > Number(currentUserRep)) {
      event.target.elements[1].value = "";
      event.target.elements[2].value = "";
      alert("You do not have enough rep for a bet that size");
      return;
    }
    const direction = event.target.elements[3].value;
    const bet = {
      currentUserRep,
      ticker,
      wager,
      direction
    }
    const body = JSON.stringify(bet);
    event.target.elements[1].value = "";
    event.target.elements[2].value = "";

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

  collect(bet, currentUserRep) {
    event.preventDefault();
    const { percentChange, wager, ticker, direction } = bet; 
    const body = JSON.stringify({
      percentChange,
      wager,
      ticker,
      direction,
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
    this.setState({ direction: true });
  }

  setFalse() {
    this.setState({ direction: false });
  }

  render() {

    const data = this.props || { bets: [{ticker: "Ticker Goes Here", wager: "Amount wagered here", direction: "Bull or Bear", start_price: "9.99", percentChange: "3.45"}]};
    const bets = data.bets.map((bet, index) => {
      if (!bet.collected_at) {
        return (
          <div key={this.uuid()}>
            <table>
              <tbody>
                <tr>
                  <th>Ticker &ensp;</th>
                  <th>Wager &ensp;</th>
                  <th>Direction &ensp;</th>
                  <th>Start Price &ensp;</th>
                  <th>%Change &ensp;</th>
                </tr>
                <br />
                <tr>
                  <th>{bet.ticker}</th>
                  <th>{bet.wager}</th>
                  <th>{bet.direction}</th>
                  <th>{bet.start_price}</th>
                  <th>{bet.percentChange}</th>
                </tr>
              </tbody>
            </table>
            <br />
              <button onClick={() => { this.collect(bet, this.currentUserRep) }}>Collect !</button>
          </div>
        )
      } else {
        return (
          <div key={this.uuid()}>
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
          <input name="ticker" placeholder="Enter a ticker" />
          <br />
          <input name="wager" placeholder="Enter wager amount" />
          <br />
          <label>Choose a direction: </label>
          <input name="direction" type="hidden" value={this.state.direction} />
          <input id="direction-bull-button" name="direction" type="submit" onClick={this.setTrue} value="Bull" />
          <input id="direction-bear-button" name="direction" type="submit" onClick={this.setFalse} value="Bear" />
        </form>
      </section>
    );
  }
}

export default Bets;
