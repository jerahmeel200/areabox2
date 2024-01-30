import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ACTION_NEXT_PAGE } from '../store';

export class SubComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setStoreProp() {
    //this works too:
    this.props.dispatch({
      type: ACTION_NEXT_PAGE,
      payload: { defaultUserName: 'set_from_sub_component' }
    });
    //somehow not working on areabox proj
  }

  render() {
    const { defaultUserName } = this.props;

    return (
      <>
        <a onClick={this.setStoreProp.bind(this)}>
          test dispatch from sub-component
        </a>
      </>
    );
  }
} //class

SubComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default SubComponent;
