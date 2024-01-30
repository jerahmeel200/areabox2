import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from 'shards-react';

const SidebarCategories = ({ title, channels, handleCheck, checkedRooms }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush style={{ height: '32rem' }}>
        <ListGroupItem className="px-3 pb-2 overflow-auto">
          {channels &&
            channels.map((channel, index) => (
              <FormCheckbox
                key={index}
                className="mb-1"
                checked={checkedRooms.some((room) => room.key === channel.key)}
                name={channel.title}
                onChange={() => handleCheck(channel)}>
                {channel.title}
              </FormCheckbox>
            ))}
        </ListGroupItem>

        <ListGroupItem className="d-flex px-3">
          <InputGroup className="ml-auto">
            <FormInput placeholder="New channel" />
            <InputGroupAddon type="append">
              <Button theme="white" className="px-2">
                <i className="material-icons">add</i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  title: 'Channels'
};

export default SidebarCategories;
