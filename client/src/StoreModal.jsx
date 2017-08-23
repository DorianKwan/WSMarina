import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Store from './Store.jsx';
 
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
 
class FarmModal extends React.Component {
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
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
  render() {
    return (
      <span>
        <button onClick={this.openModal}>STORE &ensp; &ensp; /</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Store Modal"
        >
          <h1>Store</h1>
          <button className="modal-button" onClick={this.closeModal}>❌</button>
          <Store currentUsername={this.props.currentUsername} currentUserId={this.props.currentUserId} currentUserRep={this.props.currentUserRep} />
        </Modal>
      </span>
    );
  }
}
 
export default FarmModal;