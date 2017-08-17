import React from 'react';

class ProfilePage extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      image:'',
      bio:'',
    }
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
    const image = event.target.elements[0].value;
    const bio = event.target.elements[1].value;
    const body = JSON.stringify({image: image, bio: bio});

    fetch("/users", {
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
      return response.json()
    }).then((body) => {
      console.log(body);
    });
  }

  render() {
    return (
      <div>
        <p> profile page</p>
        <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="image" ref="image"/>
        <input type="text" placeholder="bio" ref="bio"/>
        <input type="submit" />
      </form>
      </div>
    );
  }
}

export default ProfilePage;

