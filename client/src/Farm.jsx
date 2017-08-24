import React from 'react';

class Farm extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.handleSubmit.bind(this);
    this.getFarmInfo = this.getFarmInfo.bind(this);
    this.resetFarm = this.resetFarm.bind(this);
    this.autoFarmCollect = this.autoFarmCollect.bind(this);
  }

  componentDidMount() {
    this.getFarmInfo();
  }

  getResetDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const fullDate = `${year}, ${month}, ${day + 1}, 0`;
    return fullDate;
  }

  autoFarmCollect(farm) {
    const createdAt = farm.slot_01.created_at;
    const resetTime = this.getResetDate(createdAt);
    const today = Date.now();
    if (today > resetTime) {
      this.resetFarm();
    }
    return;
  }

  resetFarm() {
    const url = "/reset"
    const farm = {
      slot_01: this.props.defaultValue[0].name,
      slot_02: this.props.defaultValue[1].name,
      slot_03: this.props.defaultValue[2].name,
      slot_04: this.props.defaultValue[3].name,
      slot_05: this.props.defaultValue[4].name
    }
    const body = JSON.stringify(farm);

    fetch(url, {
      method: 'PUT',
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
    }).then((text) => {
      this.props.setFarm();
    }).catch((error) => {
      console.log(error);
    });
  }

  getFarmInfo() {
    fetch("/farms", {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((slots) => {
      const farm = {
        slot_01: { name: slots.slot_01.name, created_at: slots.slot_01.created_at, collected_at: slots.slot_01.collected_at },
        slot_02: { name: slots.slot_02.name, created_at: slots.slot_02.created_at, collected_at: slots.slot_02.collected_at },
        slot_03: { name: slots.slot_03.name, created_at: slots.slot_03.created_at, collected_at: slots.slot_03.collected_at },
        slot_04: { name: slots.slot_04.name, created_at: slots.slot_04.created_at, collected_at: slots.slot_04.collected_at },
        slot_05: { name: slots.slot_05.name, created_at: slots.slot_05.created_at, collected_at: slots.slot_05.collected_at }
      }
      this.setState(farm);
      return farm;
    }).then((farm) => {
      this.autoFarmCollect(farm);
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }

  handleSubmit(event) {
    event.preventDefault(); 
  
    const ticker_01 = event.target.elements[0].value || this.props.defaultValue[0].name;
    const ticker_02 = event.target.elements[1].value || this.props.defaultValue[1].name;
    const ticker_03 = event.target.elements[2].value || this.props.defaultValue[2].name;
    const ticker_04 = event.target.elements[3].value || this.props.defaultValue[3].name;
    const ticker_05 = event.target.elements[4].value || this.props.defaultValue[4].name;
    const tickers = [ticker_01, ticker_02, ticker_03, ticker_04, ticker_05];

    tickers.forEach((item) => { 
      if (item.length > 4) {
        alert("Ticker length must be 4 characters or less");
      }
    });
    let obj = {};
    tickers.forEach((item) => {
      if (obj[item]) {
        alert(`One of your slots is already ${item.toUpperCase()}`);
        return;
      }
      obj[item] = item;
    });

    const farmSlots = {
      slot_01: { name: ticker_01.toUpperCase(), created_at: this.state.slot_01.created_at, collected_at: this.state.slot_01.collected_at },
      slot_02: { name: ticker_02.toUpperCase(), created_at: this.state.slot_02.created_at, collected_at: this.state.slot_02.collected_at },
      slot_03: { name: ticker_03.toUpperCase(), created_at: this.state.slot_03.created_at, collected_at: this.state.slot_03.collected_at },
      slot_04: { name: ticker_04.toUpperCase(), created_at: this.state.slot_04.created_at, collected_at: this.state.slot_04.collected_at },
      slot_05: { name: ticker_05.toUpperCase(), created_at: this.state.slot_05.created_at, collected_at: this.state.slot_05.collected_at }
    }

    const body = JSON.stringify(farmSlots);

    event.target.elements[0].value = "";
    event.target.elements[1].value = "";
    event.target.elements[2].value = "";
    event.target.elements[3].value = "";
    event.target.elements[4].value = "";

    fetch("/farms", {
      method: "PUT",
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
    }).then((text) => {
      this.props.setFarm();
      this.getFarmInfo();
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <section className="farm">
        <div>
          <span className="farm-title"></span>
          <span>Choose your farm !</span>
          <form onSubmit={this.onSubmit}>
            <label>Current Value: { this.props.defaultValue[0].name }</label>
            <input id="slot_01" type="text" ref="slot_01" />
            <br />
            <label>Current Value: { this.props.defaultValue[1].name }</label>
            <input id="slot_02" type="text" ref="slot_02" />
            <br />
            <label>Current Value: { this.props.defaultValue[2].name }</label>
            <input id="slot_03" type="text" ref="slot_03" />
            <br />
            <label>Current Value: { this.props.defaultValue[3].name }</label>
            <input id="slot_04" type="text" ref="slot_04" />
            <br />
            <label>Current value: { this.props.defaultValue[4].name }</label>
            <input id="slot_05" type="text" ref="slot_05" />
            <br />
            <input type="submit" />
          </form>
        </div>
        <br />
        <div>
          <form onSubmit={this.resetFarm}>
            <input type="submit" value="Reset Farm" />
          </form>
        </div>
      </section>
    );
  }
}

export default Farm;