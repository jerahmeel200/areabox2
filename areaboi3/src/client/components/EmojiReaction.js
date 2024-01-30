import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { Picker, Emoji } from 'emoji-mart';
import Layout from '../layouts/ReactionStyles';

const wrapperStyle = {
  display: 'inline-block',
  marginTop: '2px',
  marginBottom: '2px',
  marginRight: '4px',
  padding: '1px 2px',
  borderRadius: '5px',
  border: '1px solid #E8E8E8',
  cursor: 'pointer',
  height: '1.4rem',
  lineHeight: '23px',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none'
};

const emojiStyle = {
  lineHeight: '20px',
  verticalAlign: 'middle',
  display: 'inline-block'
};

const wrapperHover = {
  border: '1px solid #4fb0fc'
};

const countStyle = {
  fontSize: '11px',
  fontFamily: 'helvetica, arial',
  position: 'relative',
  top: '-2px',
  padding: '0 1px 3px',
  color: '#fff'
};

const countHover = {
  color: '#4fb0fc'
};

const customReactionEmojis = [
  {
    id: '+1',
    name: 'Thumbs Up Sign',
    short_names: ['+1', 'thumbsup'],
    colons: ':+1::skin-tone-5:',
    emoticons: [],
    unified: '1f44d-1f3fe',
    skin: 5,
    native: '👍🏾'
  },
  {
    id: 'clap',
    name: 'Clapping Hands Sign',
    short_names: ['clap'],
    colons: ':clap::skin-tone-5:',
    emoticons: [],
    unified: '1f44f-1f3fe',
    skin: 5,
    native: '👏🏾'
  },
  {
    id: 'heart',
    name: 'Heavy Black Heart',
    short_names: ['heart'],
    colons: ':heart:',
    emoticons: ['<3'],
    unified: '2764-fe0f',
    skin: null,
    native: '❤️'
  },
  {
    id: 'joy',
    name: 'Face with Tears of Joy',
    short_names: ['joy'],
    colons: ':joy:',
    emoticons: [],
    unified: '1f602',
    skin: null,
    native: '😂'
  },
  {
    id: 'open_mouth',
    name: 'Face with Open Mouth',
    short_names: ['open_mouth'],
    colons: ':open_mouth:',
    emoticons: [':o', ':-o', ':O', ':-O'],
    unified: '1f62e',
    skin: null,
    native: '😮'
  },
  {
    id: 'cry',
    name: 'Crying Face',
    short_names: ['cry'],
    colons: ':cry:',
    emoticons: [":'("],
    unified: '1f622',
    skin: null,
    native: '😢'
  },
  {
    id: 'face_with_rolling_eyes',
    colons: ':face_with_rolling_eyes:',
    emoticons: [],
    name: 'Face with Rolling Eyes',
    short_names: ['face_with_rolling_eyes'],
    unified: '1f644',
    skin: null,
    native: '🙄'
  },
  {
    id: '-1',
    colons: ':-1::skin-tone-6:',
    emoticons: [],
    name: 'Thumbs Down Sign',
    short_names: ['-1', 'thumbsdown'],
    unified: '1f44e-1f3ff',
    skin: 6,
    native: '👎🏿'
  }
];
// {
//   id: "fire",
//   name: "Fire",
//   short_names: ["fire"],
//   colons: ":fire:",
//   emoticons: [],
//   unified: "1f525",
//   skin: null,
//   native: "🔥",
// },
// {
//   id: "100",
//   name: "Hundred Points Symbol",
//   short_names: ["100"],
//   colons: ":100:",
//   emoticons: [],
//   unified: "1f4af",
//   skin: null,
//   native: "💯"
// },

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
    margin: '0 auto'
  },
  content: {
    top: '30%',
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

export default class ReactionPicker extends React.Component {
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
    if (emoji) console.log('Selected Emoji', emoji);
    this.props.modalClosed(emoji);
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
      <React.Fragment>
        <Layout />
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
                title="Add reaction"
                emoji="smile"
                showPreview={false}
                include={['custom']}
                custom={customReactionEmojis}
              />
            </div>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

// Based on Conor Hastings react-emoji-react components
class SingleEmoji extends Component {
  constructor() {
    super();
    this.state = { hovered: false };
  }

  render() {
    const {
      emoji,
      styles = {
        wrapperStyle: wrapperStyle,
        emojiStyle: emojiStyle,
        countStyle: countStyle,
        wrapperHover: wrapperHover,
        countHover: countHover
      },
      onClick = () => {}
    } = this.props;

    const wrapperFinalStyle = this.state.hovered
      ? { ...wrapperStyle, ...wrapperHover }
      : wrapperStyle;
    const countFinalStyle = this.state.hovered
      ? { ...countStyle, ...countHover }
      : countStyle;
    return (
      <div
        style={wrapperFinalStyle}
        onClick={() => onClick(emoji)}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}>
        <span style={emojiStyle}>
          <Emoji emoji={emoji} size={16} />
        </span>
        <span style={countFinalStyle}>{emoji.count}</span>
      </div>
    );
  }
}

export const EmojiWrapper = ({ reactions, onReaction }) => {
  console.log('EmojiWrapper', reactions?.length);
  return (
    <div className="reactions" style={{ display: 'inline-block' }}>
      {reactions?.length > 0 &&
        reactions?.map((emoji) => (
          <SingleEmoji
            emoji={emoji}
            count={emoji.count}
            key={emoji.id}
            onClick={onReaction}
          />
        ))}
    </div>
  );
};
