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

  checkTicker(input) {
    const tickers = {
      tickers: [
        {name: input[0]},
        {name: input[1]},
        {name: input[2]},
        {name: input[3]},
        {name: input[4]}
      ]
    }
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
            <label> Slot 1:
              <input type="text" placeholder="Slot 1" value={this.state.tickers[0].name} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label> Slot 2:
              <input type="text" placeholder="Slot 2" value={this.state.tickers[1].name} onChange={this.handleChange.bind(this)}/>
            </label><br />
            <label> Slo 3:
              <input type="text" placeholder="Slot 3" value={this.state.tickers[2].name} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label> Slot 4:
              <input type="text" placeholder="Slot 4" value={this.state.tickers[3].name} onChange={this.handleChange.bind(this)}/>
            </label><br />
            <label> Slot 5:
              <input type="text" placeholder="Slot 5" value={this.state.tickers[4].name} onChange={this.handleChange.bind(this)} />
            </label><br />
      </section>
    );
  }
}

export default Ticker;
