import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { Picker } from 'emoji-mart';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
    margin: '0 auto'
  },
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    backgroundColor: 'transparent',
    color: 'white',
    zIndex: 5
  },
  input: {
    backgroundColor: 'black',
    color: 'white'
  }
};

export default class Emoji extends React.Component {
  static propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    console.log('Emoji constructor props.modalOpened');

    this.state = {
      hasErr: false,
      modalIsOpen: props.modalOpened,
      title: '',
      isPublic: true
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.public = true;
    this.title = '';
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalOpened !== nextProps.modalOpened) {
      if (nextProps.modalOpened) this.openModal();
      else this.closeModal();
    }
  }

  componentWillMount() {
    //Modal.setAppElement('#__next');
  }

  componentWillUpdate() {
    console.log('Emoji componentWillUpdate', this.props.modalOpened);

    if (this.props.modalOpened && !this.state.modalIsOpen) {
      //console.log("newR opening");
      this.openModal();
      return;
    }
    if (!this.props.modalOpened && this.state.modalIsOpen) {
      //console.log("newR closing");
      this.closeModal();
      return;
    }

    if (!this.props.modalOpened) return;

    console.log('Emoji');
    Modal.setAppElement('#__next');
  }

  handleSubmit(emoji) {
    console.log('An emoji was submitted: ', emoji);
    if (emoji && (emoji.native || emoji.colons))
      this.props.modalClosed(emoji.native ? emoji.native : emoji.colons);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.modalClosed();
  }

  render() {
    const { hasErr, title } = this.state;

    console.log('Emoji', this.state.modalIsOpen);

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        style={customStyles}
        contentLabel="pick Emoji"
        shouldCloseOnOverlayClick={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}>
        {!hasErr && (
          <div>
            <Picker
              onClick={this.handleSubmit}
              style={{}}
              title="Add Emoji"
              emoji="point_up"
            />
          </div>
        )}
      </Modal>
    );
  }

  /*
   
{id: "girl", name: "Girl", short_names: Array(1), colons: ":girl:", emoticons: Array(0), …}
colons: ":girl:"
emoticons: []
id: "girl"
name: "Girl"
native: "👧"
short_names: ["girl"]
skin: 1
unified: "1f467"
          
  */

  componentDidMount() {}

  componentWillUnmount() {}
}
