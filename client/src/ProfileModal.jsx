import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ProfilePage from './ProfilePage.jsx';
 
const customStyles = {
  content : {
    padding               : '50px',
    backgroundColor       : 'black',
    overflow              : 'visible',
    height                : '470px',
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
        <button className="navbar-button" onClick={this.openModal}>PROFILE &ensp; &ensp; <span style={{color: "white"}} >/</span></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Profile Modal"
        >
          <h1 className="modal-name">P R O F I L E</h1>
          <button className="modal-button" onClick={this.closeModal}>❌</button>
          <ProfilePage 
            deleteFlair={this.props.deleteFlair}
            currentUsername={this.props.currentUsername}
            currentUserRep={this.props.currentUserRep}
            currentUserFlairs={this.props.currentUserFlairs}
            currentUserImage={this.props.currentUserImage}
            currentUserEmail={this.props.currentUserEmail}
            currentUserTitle={this.props.currentUserTitle}
            currentUserBio={this.props.currentUserBio}
            profileSubmit={this.props.profileSubmit}
           />
        </Modal>
      </span>
    );
  }
}
 
export default ProfileModal;