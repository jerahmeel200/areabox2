import React from 'react';
import { Provider, connect } from 'react-redux';
import AsyncApp from '../components/AsyncApp';
import { ACTION_NEXT_PAGE } from '../store';

class login extends React.Component {
  static async getInitialProps({ store, pathname, query, isServer }) {
    console.log('query', query);

    //ok to dispacth from here too, tested Ok
    //store.dispatch({type: ACTION_NEXT_PAGE, payload:{defaultUserName: "guest"}});
    return {};
  } //getInitialProps

  constructor(props) {
    super(props);
    this.state = { loggedIn: -1, userInfo: null }; //, props: props
    //this.continueLogin= this.continueLogin().bind(this)
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
export default connect((state) => state)(login);
