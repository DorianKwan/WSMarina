import React, { Component }from 'react';

function calculatePercentChange(currentPrice, openingPrice) {
  return currentPrice > openingPrice ? ((currentPrice / openingPrice) - 1) * 100 : ((openingPrice / currentPrice) - 1) * -100;
}

function round(number, decimals) {
    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
}

class Ticker extends Component {

  constructor(props) {
    super(props);
    this.realTimeTickers = this.realTimeTickers.bind(this);
  }

  componentDidMount() {
    this.realTimeTickers();
    setInterval(this.realTimeTickers, 60000);
  }

  realTimeTickers() {
    const alphaVantageKey = 'YW6PCYJ22Y79AP56';
    Promise.all(
      this.props.tickers.map((item, index) => {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${item.name}&outputsize=full&apikey=${alphaVantageKey}`)
        .then((resp) => resp.json());
      })
    ).then(all => {
      const tickers = all.map(data => {
        const realTimeData = data['Time Series (Daily)'];
        for (let date in realTimeData) {
          const price = realTimeData[date]['4. close'];
          const open = realTimeData[date]['1. open'];
          const percentChange = calculatePercentChange(price, open);

          return {
            name: data['Meta Data']['2. Symbol'],
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
    const data = this.state || this.props;
    const stocks = data.tickers.map(stock => {
      return (
        <div key={ stock.name }>{ stock.name } | { stock.price }</div>
      )
    });

    return (
      <section id="tickers">
        { stocks }
      </section>
    );
  }
}

export default Ticker;

