import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ProfilePage from './ProfilePage.jsx';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
class ProfileModal extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
 
  render() {
    return (
      <span>
        <button onClick={this.openModal}>PROFILE &ensp; &ensp; /</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Profile Modal"
        >
          <h1>Profile</h1>
          <button onClick={this.closeModal}>❌</button>
          <ProfilePage currentUserFlairs={this.props.currentUserFlairs} />
        </Modal>
      </span>
    );
  }
}
 
export default ProfileModal;