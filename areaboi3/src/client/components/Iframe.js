import React, { Component } from 'react';
import PropTypes from 'prop-types';
//http://codepen.io/micha149/pen/zBzLwJ
/**
 * React component which renders the given content into an iframe.
 * Additionally an array of stylesheet urls can be passed. They will
 * also be loaded into the iframe.
 */
export default class Iframe extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    stylesheets: PropTypes.arrayOf(PropTypes.string),
    scripts: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired
  };

  /**
   * Called after mounting the component. Triggers initial update of
   * the iframe
   */
  componentDidMount() {
    this._updateIframe();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false; // to React, it uses client JS to update
  }

  /**
   * Called each time the props changes. Triggers an update of the iframe to
   * pass the new content
   */
  componentDidUpdate() {
    this._updateIframe();
  }

  /**
   * Updates the iframes content and inserts stylesheets.
   * TODO: Currently stylesheets are just added for proof of concept. Implement
   * and algorithm which updates the stylesheets properly.
   */
  _updateIframe() {
    const iframe = this.refs.iframe;

    const document = iframe.contentDocument;
    const head = document.getElementsByTagName('head')[0];
    if (this.props.content.length > 0)
      document.body.innerHTML = this.props.content;

    this.props.stylesheets.forEach((url) => {
      const ref = document.createElement('link');
      ref.rel = 'stylesheet';
      ref.type = 'text/css';
      ref.href = url;
      head.appendChild(ref);
    });

    this.props.scripts.forEach((url) => {
      const sref = document.createElement('script');
      sref.src = url;
      head.appendChild(sref);
    });
  }

  /**
   * This component renders just and iframe
   */
  render() {
    return (
      <div className={this.props.className}>
        {this.props.content.length > 0 && (
          <iframe
            id={this.props.id}
            ref="iframe"
            className={this.props.className}
          />
        )}
        {this.props.content.length == 0 && (
          <iframe
            id={this.props.id}
            src={this.props.src}
            ref="iframe"
            className={this.props.className}
          />
        )}
      </div>
    );
  }
}

/*
width={this.props.width} height={this.props.height}
*/
