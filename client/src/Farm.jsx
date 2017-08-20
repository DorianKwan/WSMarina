import React from 'react';

class Farm extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.handleSubmit.bind(this);
    this.getFarmInfo = this.getFarmInfo.bind(this);
  }

  componentDidMount() {
    this.getFarmInfo();
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
        slot_01: slots.slot_01,
        slot_02: slots.slot_02,
        slot_03: slots.slot_03,
        slot_04: slots.slot_04,
        slot_05: slots.slot_05
      });
    }).catch((error) => { 
      console.log("error: ", error); 
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // ASK MENTOR FOR HELP! REMIND KAI
  
    const slot_01 = event.target.elements[0].value || this.props.defaultValue[0].name;
    const slot_02 = event.target.elements[1].value || this.props.defaultValue[1].name;
    const slot_03 = event.target.elements[2].value || this.props.defaultValue[2].name;
    const slot_04 = event.target.elements[3].value || this.props.defaultValue[3].name;
    const slot_05 = event.target.elements[4].value || this.props.defaultValue[4].name;
    const body = JSON.stringify({
      slot_01,
      slot_02,
      slot_03,
      slot_04,
      slot_05
    });

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
      </section>
    );
  }
}

export default Farm;