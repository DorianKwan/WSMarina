import React from 'react';

class Farm extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.handleSubmit.bind(this);
    this.getFarmInfo = this.getFarmInfo.bind(this);
    this.resetFarm = this.resetFarm.bind(this);
    this.resetFarmCollect = this.resetFarmCollect.bind(this);
  }

  componentDidMount() {
    this.getFarmInfo();
  }

  resetFarmCollect() {
    const currentDate = new Date; 
    const currentTime = currentDate.toTimeString().slice(0, 5);
    if (currentTime === "04:00") {
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
    })
    .then((response) => {
      return response.json();
    }).then((slots) => {
      this.setState({
        slot_01: { name: slots.slot_01.name, collected_at: slots.slot_01.collected_at },
        slot_02: { name: slots.slot_02.name, collected_at: slots.slot_02.collected_at },
        slot_03: { name: slots.slot_03.name, collected_at: slots.slot_03.collected_at },
        slot_04: { name: slots.slot_04.name, collected_at: slots.slot_04.collected_at },
        slot_05: { name: slots.slot_05.name, collected_at: slots.slot_05.collected_at }
      });
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // ASK MENTOR FOR HELP! REMIND KAI
  
    const ticker_01 = event.target.elements[0].value || this.props.defaultValue[0].name;
    const ticker_02 = event.target.elements[1].value || this.props.defaultValue[1].name;
    const ticker_03 = event.target.elements[2].value || this.props.defaultValue[2].name;
    const ticker_04 = event.target.elements[3].value || this.props.defaultValue[3].name;
    const ticker_05 = event.target.elements[4].value || this.props.defaultValue[4].name;
    const farmSlots = {
      slot_01: { name: ticker_01, collected_at: this.state.slot_01.collected_at },
      slot_02: { name: ticker_02, collected_at: this.state.slot_02.collected_at },
      slot_03: { name: ticker_03, collected_at: this.state.slot_03.collected_at },
      slot_04: { name: ticker_04, collected_at: this.state.slot_04.collected_at },
      slot_05: { name: ticker_05, collected_at: this.state.slot_05.collected_at }
    }

    const body = JSON.stringify(farmSlots);

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
      <section>
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