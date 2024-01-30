import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from 'shards-react';

const MoviesList = ({ title, cinemas }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush style={{ height: '32rem' }}>
        <ListGroupItem className="px-3 pb-2 overflow-auto">
          {cinemas &&
            cinemas.map((cinema, index) => (
              <p
                key={index}
                className="mb-1"
                name={cinema.title}
                onChange={() => {}}>
                {cinema.title}
              </p>
            ))}
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

MoviesList.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

MoviesList.defaultProps = {
  title: 'Posted Movies'
};

export default MoviesList;
