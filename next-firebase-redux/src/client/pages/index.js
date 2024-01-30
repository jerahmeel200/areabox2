import React from 'react';
import { Provider, connect } from 'react-redux';
import AsyncApp from '../components/AsyncApp';
import { ACTION_NEXT_PAGE } from '../store';

class A3 extends React.Component {
  static async getInitialProps({ store, pathname, query, isServer }) {
    if (query.user)
      store.dispatch({
        type: ACTION_NEXT_PAGE,
        payload: { defaultUserName: query.user }
      });
    //let ss= store.getState()
    return {}; // ss
  } //getInitialProps

  constructor(props) {
    super(props);
    this.state = { loggedIn: -1, userInfo: null }; //, props: props
  }

  render() {
    const { loggedIn, userInfo } = this.state;

    return (
      <div>
        <AsyncApp {...this.props} loggedIn userInfo />
      </div>
    );
  }
} //class

//redux
export default connect((state) => state)(A3);
