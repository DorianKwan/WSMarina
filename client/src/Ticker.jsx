import React, { Component }from 'react';

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
    this.checkTicker = this.checkTicker.bind(this);
  }

  componentDidMount() {
    this.tickerFeed();
    setInterval(this.tickerFeed, 60000);
  }

  checkTicker() {
    const tickers = { tickers: [{ name: 'DRYS' }, { name: 'TSLA' }, { name: 'CLS' }, { name: 'CDTI' }, { name: 'NLST' }] };
    this.tickerFeed(tickers);
  }

  tickerFeed(input) {
    const alphaVantageKey = 'Your api key here';
    const data = input || this.state || this.props;
    Promise.all(
      data.tickers.map((item, index) => {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${item.name}&outputsize=full&apikey=${alphaVantageKey}`)
        .then((resp) => resp.json());
      })
    ).then(all => {
      const tickers = all.map(data => {
        const realTimeStockPrices = data['Time Series (Daily)'];
        for (let time in realTimeStockPrices) {
          const price = round(realTimeStockPrices[time]['4. close'], 2);
          const open = round(realTimeStockPrices[time]['1. open'], 2);
          const percentChange = round(calculatePercentChange(price, open), 2);

          return {
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
    const stocks = data.tickers.map(stock => {
      return (
        <div key={ stock.name }>{ stock.name } | ${ stock.price } | { stock.percentChange }% </div>
      )
    });

    return (
      <section id="tickers">
        { stocks }
        <button onClick={ this.checkTicker }>ChangeTickers</button>
      </section>
    );
  }
}

export default Ticker;
