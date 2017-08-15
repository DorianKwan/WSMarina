import React from 'react';
import StockReel from './StockReel.jsx';
import NewsReel from './NewsReel.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <StockReel></StockReel>
        <p>JOIN OUR COMMUNITY NOW!</p>
        <NewsReel></NewsReel>
      </div>
    );
  }
});