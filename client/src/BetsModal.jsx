import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Bets from './Bets.jsx';
 
const customStyles = {
  content : {
    overflow              : 'visible',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
function calculatePercentChange(currentPrice, openingPrice) {
  return currentPrice > openingPrice ? ((currentPrice / openingPrice) - 1) * 100 : ((openingPrice / currentPrice) - 1) * -100;
}

function round(number, decimals) {
  return Number(Math.round(number + "e" + decimals) + "e-" + decimals).toFixed(2);
}

class BetsModal extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getBets = this.getBets.bind(this);
    this.getTickerPrice = this.getTickerPrice.bind(this);
    this.timestampCheck = this.timestampCheck.bind(this);
  }

  componentDidMount() {
    this.findCurrentUserRep();
    this.getBets();    
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed. 
    // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  findCurrentUserRep() {
    //For Localhost use the below url
    const url = "/currentUser";

    fetch(url, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((user) => {
      this.setState({
        currentUserRep: user.rep,
      });
      this.props.findUser();
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
      credentials: "include",
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

  timestampCheck(bet, percentChange) {
    const today = Date.now();
    const created_at = Date.parse(bet.created_at);
    if ((created_at + 86400000) < today && !bet.collected_at) {
      this.payoutBet(bet, percentChange);
      return;
    }
    return;
  }

  payoutBet(bet, percentChange) {

    const { ticker, wager, direction } = bet;
    const currentUserRep = this.state.currentUserRep;

    const body = JSON.stringify({
      ticker,
      wager,
      direction: direction ? "Bull" : "Bear",
      percentChange,
      currentUserRep
    });

    fetch("/payout", {
      method: "POST",
      credentials: "include",
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
    Promise.all(
      list.bets.map((bet) => {
        const ticker = bet.ticker;
        return fetch(`/api/alphavantage?symbol=${ticker}`)
          .then((response) => {
            return response.json();
          });
      })
    ).then(all => {
      const bets = all.map((data, index) => {

        const realTimeStockPrices = data["Time Series (Daily)"];

        for (let time in realTimeStockPrices) {

          const { ticker, wager, created_at } = list.bets[index];
          const direction = list.bets[index].direction ? "Bull" : "Bear";
          const currentPrice = round(realTimeStockPrices[time]["4. close"], 2);
          const start_price = list.bets[index].start_price || currentPrice;
          const percentChange = round(calculatePercentChange(Number(start_price), Number(currentPrice)), 2);
          const collected_at = list.bets[index].collected_at || null;
          const payout = list.bets[index].payout || null;

          if (!created_at) {
            this.initializeBet(list.bets[index], currentPrice);
          } else {
            this.timestampCheck(list.bets[index], percentChange);
          }

          return {
            ticker,
            wager,
            direction,
            start_price,
            percentChange,
            collected_at,
            payout
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

  getBets() {
    fetch("/bets", {
      credentials: "include",
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
      this.props.findUser();
      this.getTickerPrice(list);
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }
 
  render() {
    return (
      <span>
        <button className="navbar-button" onClick={this.openModal}>BETS &ensp; &ensp; <span style={{color: "white"}} >/</span></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Bets Modal"
        >
          <div>
            <h1>Bets</h1>
            <button className="modal-button" onClick={this.closeModal}>❌</button>
          </div>
          <Bets currentUserRep={this.state.currentUserRep} bets={this.state.bets} getBets={this.getBets.bind(this)}/>
        </Modal>
      </span>
    );
  }
}
 
export default BetsModal;