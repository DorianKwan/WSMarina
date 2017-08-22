import React, { Component } from 'react';

function calculatePercentChange(currentPrice, openingPrice) {
  return currentPrice > openingPrice ? ((currentPrice / openingPrice) - 1) * 100 : ((openingPrice / currentPrice) - 1) * -100;
}

function round(number, decimals) {
  return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals).toFixed(2);
}

class Ticker extends Component {

  constructor(props) {
    super(props);
    this.tickerFeed = this.tickerFeed.bind(this);
    this.getTickers - this.getTickers.bind(this);
  }

  componentWillMount() {
    this.getTickers();
    setInterval(this.tickerFeed, 60000);
  }

  getTickers() {
    fetch("/farms", {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    .then((response) => {
      return response.json();
    }).then((slots) => {
      this.setState({
        tickers: [
          { name: slots.slot_01.name, collected_at: slots.slot_01.collected_at },
          { name: slots.slot_02.name, collected_at: slots.slot_02.collected_at },
          { name: slots.slot_03.name, collected_at: slots.slot_03.collected_at },
          { name: slots.slot_04.name, collected_at: slots.slot_04.collected_at },
          { name: slots.slot_05.name, collected_at: slots.slot_05.collected_at },
        ]
      });
    })
    .then(() => {
      this.tickerFeed();
    })
    .catch((error) => { 
      console.log("error: ", error); 
    });
  }

  tickerFeed() {
    const alphaVantageKey = 'your api key';
    const data = this.state || this.props;
    Promise.all(
      data.tickers.map((item, index) => {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${item.name}&outputsize=full&apikey=${alphaVantageKey}`)
        .then((resp) => resp.json());
      })
    ).then(all => {
      const tickers = all.map((data, index) => {
        const realTimeStockPrices = data['Time Series (Daily)'];
        for (let time in realTimeStockPrices) {
          const price = round(realTimeStockPrices[time]['4. close'], 2);
          const open = round(realTimeStockPrices[time]['1. open'], 2);
          const percentChange = round(calculatePercentChange(price, open), 2);
          const collected_at = this.state.tickers[index].collected_at;

          return {
            collected_at,
            name: data['Meta Data']['2. Symbol'],
            open,
            price,
            percentChange
          };
        }
      });
      this.setState({
        tickers
      }); 
    }).catch(function(error) {
        console.log(error);
    })
  }

  render() {
    const data = this.state || this.props; // Is this necessary? For now it will only pass state if tickerFeed is broken
    const stocks = data.tickers.map((stock, index) => {
      const isActive = stock.collected_at || undefined;
      if (stock.collected_at === null) {
        return (
            <div key={ stock.name }>
              <form action="/farms" method="POST" >
                <input name="index" type="hidden" value={index} />
                <input name="ticker" type="hidden" value={stock.name} />
                <input name="currentUserRep" type="hidden" value={this.props.currentUserRep || ""} />
                <input name="currentUserId" type="hidden" value={this.props.currentUserId || ""} />
                <input name="open" type="hidden" value={stock.open} />
                <input name="currentPrice" type="hidden" value={stock.price} />
                <div>{ stock.name } | ${ stock.price } | { stock.percentChange }%</div>
                <input type="submit" value="Collect !" />
              </form>
            </div>
          )
      } else {
        return (
          <span key={ index }>
            { stock.name } | ${ stock.price } | { stock.percentChange }%
          </span>
        )
      }

    });

    return (
      <section className="tickers">
        <marquee>{ stocks }</marquee>
      </section>
    );
  }
}

export default Ticker;