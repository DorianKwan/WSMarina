import React from "react";
import NewsReel from "./NewsReel.jsx";
import StockReel from "./StockReel.jsx";

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
