import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardHeader } from 'shards-react';
import axios from 'axios';
import { firestore } from '../../firebase';

class StreamCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: {},
      isLoading: null
    };
  }

  createStream = () => {
    this.setState({ isLoading: true });
    axios
      .post(
        'create-stream',
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        firestore.collection('streams').doc('current').set(res.data);
        this.setState({ stream: res.data, isLoading: false });
      })
      .catch((e) => console.error('Failed to create live stream, >', e));
  };

  render() {
    const { title } = this.props;
    const { isLoading, stream } = this.state;
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h4 className="m-0">{title}</h4>
        </CardHeader>
        <div className="p-3">
          <h5 className="font-weight-bold mb-0">Streaming Keys</h5>
          <p>
            Please connect with a live streaming software using the code
            provided!
          </p>
          <section>
            <h5>
              Server:{' '}
              <span className="font-weight-bold">
                rtmps://global-live.mux.com:443/app
              </span>
            </h5>
            <h5>
              Stream Key:{' '}
              <span className="font-weight-bold">
                {Object.entries(stream).length !== 0 ? stream.streamKey : ''}
              </span>
            </h5>
          </section>
          <Button squared onClick={this.createStream} disabled={isLoading}>
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"></span>
            )}
            &nbsp; {isLoading ? 'Loading...' : 'Start Stream'}
          </Button>
        </div>
      </Card>
    );
  }
}

StreamCard.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

StreamCard.defaultProps = {
  title: 'Live Stream'
};

export default StreamCard;
