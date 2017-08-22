import React, { Component } from 'react';

function calculatePercentChange(currentPrice, openingPrice) {
  return currentPrice > openingPrice ? ((currentPrice / openingPrice) - 1) * 100 : ((openingPrice / currentPrice) - 1) * -100;
}

function round(number, decimals) {
  return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals).toFixed(2);
}

class Bets extends Component {

  constructor(props) {
    super(props);
    this.getTickerPrice = this.getTickerPrice.bind(this);
    this.getBets = this.getBets.bind(this);
  }

  componentWillMount() {
    this.getBets();
    setInterval(this.getBets, 60000);
  }

  uuid() {
    return Math.random().toString(36).substr(2, 6);
  }

  getBets() {
    fetch("/bets", {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    }).then((bets) => {
      let list = { bets: [] };
      bets.forEach((bet) => {
        list.bets.push(bet);
      });
      this.getTickerPrice(list);
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }

  initializeBet(bet, currentPrice) {
    const body = JSON.stringify({
      ticker: bet.ticker,
      created_at: new Date,
      start_price: currentPrice
    });

    fetch("/bets", {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": new Buffer(body).length
      },
      body,
    })
    .then((response) => {
      return response.text();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getTickerPrice(list) {
    const alphaVantageKey = 'your api key here';

    Promise.all(
      list.bets.map((bet) => {
        const ticker = bet.ticker;
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${alphaVantageKey}`)
          .then((response) => {
            return response.json();
          });
      })
    ).then(all => {
      const bets = all.map((data, index) => {
        const realTimeStockPrices = data['Time Series (Daily)'];

        for (let time in realTimeStockPrices) {

          const ticker = list.bets[index].ticker;
          const wager = list.bets[index].wager;
          const direction = list.bets[index].direction ? "Bull" : "Bear";
          const currentPrice = round(realTimeStockPrices[time]['4. close'], 2);
          const start_price = list.bets[index].start_price || currentPrice;
          const percentChange = round(calculatePercentChange(start_price, currentPrice), 2);
          if (!list.bets[index].created_at) {
            this.initializeBet(list.bets[index], currentPrice);
          }

          return {
            ticker,
            wager,
            direction,
            start_price,
            percentChange
          }
        }
      })
      this.setState({
        bets
      });
    })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const data = this.state || { bets: [{ticker: "Ticker Goes Here", wager: "Amount wagered here", direction: "Bull or Bear", start_price: "9.99", percentChange: "3.45"}]};
    const bets = data.bets.map((bet, index) => {
      if (!bet.collected_at) {
        return (
          <div key={this.uuid()}>
            <p>{ bet.ticker } | { bet.wager } | { bet.direction } | ${ bet.start_price } | { bet.percentChange }%</p>
            <br />
            <form action="/payout" method="POST">
              <input name="percentChange" type="hidden" value={bet.percentChange} />
              <input name="wager" type="hidden" value={bet.wager} />
              <input name="ticker" type="hidden" value={bet.ticker} />
              <input name="direction" type="hidden" value={bet.direction} />
              <input name="currentUserRep" type="hidden" value={this.props.currentUserRep || undefined} />
              <input type="submit" value="Collect"/>
            </form>
          </div>
        )
      } else {
        return (
          <div key={bet.ticker}>
            <p>{ bet.ticker } | { bet.wager } | { bet.direction } | ${ bet.start_price } | { bet.percentChange }%</p>
            <br />
          </div>
        )
      }
    });

    return (
      <section className="bets">
        <h1>Bets</h1>
        <div>{ bets }</div>
        <br />
        <h2>Make a Prediction!</h2>
        <form action="/bets" method="POST">
          <input name="currentUserRep" type="hidden" value={this.props.currentUserRep || undefined} />
          <label>Enter a Ticker: </label>
          <input name="ticker" />
          <br />
          <label>Enter Wager Amount: </label>
          <input name="wager" />
          <br />
          <label>Choose a direction: </label>
          <input name="direction" type="submit" value={true} />
          <input name="direction" type="submit" value={false} />
        </form>
      </section>
    );
  }
}

export default Bets;
