import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Iframe from './Iframe'; // as in global styles (nextjs wiki)

const me = 'Areaboi';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    //this.renderIframe = this.renderIframe.bind(this);
  }

  // this prevents to re-init areaboi-v1 that is slow 0
  //https://facebook.github.io/react/docs/optimizing-performance.html
  shouldComponentUpdate(nextProps, nextState) {
    return false; // to React, it uses client JS to update
  }

  render() {
    console.log('newPost');
    //console.log( this.props)
    const { user, room_key } = this.props;
    let styles = ['../static/card-iframe.css', '../static/iframe-hidden.css'];
    let scripts = [];

    return (
      <Iframe
        id={'new_post_iframe'}
        className={'iframe-embeds'}
        src={
          'static/post.html?v=200417&u=' +
          escape(user) +
          '&r=' +
          escape(room_key)
        }
        content={''}
        stylesheets={styles}
        scripts={scripts}
      />
    );
  }

  componentDidMount() {
    //if on client side
  }
  componentWillUnmount() {}
}

NewPost.propTypes = {
  user: PropTypes.string.isRequired,
  room_key: PropTypes.string.isRequired
};

/*

<div>{text}</div>
{user!==me &&
  <span>{user}</span>
}

*/
