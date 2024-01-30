import React, { Component, PropTypes } from 'react';
import DigitsButton from '../components/DigitsButton';
//import Digits from 'react-digits';
//https://www.npmjs.com/package/react-digits

export default class DigitsLogin extends Component {
  get consumerKey() {
    return 'TMZUFzdxwxxcmS8BNOEVG09NK';
  }

  /*
  handleLogin(resp) {
    console.info(resp)
    //resp.oauth_echo_headers
  }
  */
  render() {
    return (
      <DigitsButton
        consumerKey={this.consumerKey}
        onLogin={this.props.handleLogin.bind(this)}
      />
    );
  }
}

/*
<Digits
        consumerKey={ this.consumerKey }
        onLogin={ this.props.handleLogin.bind(this) } />
*/

DigitsLogin.propTypes = {
  handleLogin: PropTypes.func.isRequired
};
