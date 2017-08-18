import React from 'react';

class ProfilePage extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      image:'tests',
      bio:'',
      username:'',
      rep:'',
      email:'',
      flairs:''
    }
    this.onSubmit = this.handleSubmit.bind(this);
    // this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo(); 
  }

  getUserInfo() {
    var c = this;
    fetch("/users", {
      method: "GET",
      credentials: 'include'
    })
    .then((response) => {
      console.log("response ", response);
      return response.json();
    }).then((userInfo) => { 
      console.log("hereeeeee",userInfo);
      c.setState({
        image: userInfo.image,
        bio: userInfo.bio,
        username: userInfo.username,
        rep: userInfo.rep,
        email: userInfo.email,
        flairs: this.props.currentUserFlairs
      });
      console.log("userinfo......",userInfo);
  
    }).catch(function(error){ 
      console.log("error ", error); 
    });
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

  shouldComponentUpdate(nextProps) {
    const differentTitle = this.props.title !== nextProps.title;
    const differentDone = this.props.done !== nextProps.done
    return differentTitle || differentDone;
}

  render() {
    console.log("state.....", state);
    return (
      <div>
        <p> profile page</p>
        <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="image" ref="image"/>
        <input type="text" placeholder="bio" ref="bio"/>
        <input type="submit" />
        <p>email {this.state.email}</p> 
        <p>bio {this.state.bio}</p>
        <p> this state: {this.state}</p>
        <p> image {this.state.image}</p>
        <p>rep {this.state.rep}</p>
        <p>username {this.state.username}</p>
        
      </form>
      </div>
    );
  }
}

export default ProfilePage;

