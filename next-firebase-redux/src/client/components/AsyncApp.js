import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { ACTION_NEXT_PAGE } from '../store';
import SubComponent from './SubComponent';

export class AsyncApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setStore() {
    //this works too:
    this.props.dispatch({
      type: ACTION_NEXT_PAGE,
      payload: { defaultUserName: 'guest_from_async_app' }
    });
  }

  render() {
    const { defaultUserName } = this.props;

    return (
      <main>
        <header>
          <img src="static/favicon-96x96.png" />
          <hr />
          <Link legacyBehavior href="/?user=river-song">
            <a>Home test</a>
          </Link>
          <hr />
          <Link legacyBehavior href="/login">
            <a>Login</a>
          </Link>
          <hr />
          <Link legacyBehavior href="/signup">
            <a>signup</a>
          </Link>
          <br />
          <a onClick={this.setStore.bind(this)}>test dispatch from component</a>
          <br />
          <SubComponent dispatch={this.props.dispatch} />
        </header>
        <hr />
        <div>User: {defaultUserName}</div>
      </main>
    );
  }
} //class

AsyncApp.propTypes = {
  defaultUserName: PropTypes.string.isRequired,
  loggedIn: PropTypes.number.isRequired,
  userInfo: PropTypes.object
};

export default AsyncApp;
