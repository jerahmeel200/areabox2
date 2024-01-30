import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'shards-react';

import MainNavbar from '../components/layout/MainNavbar/MainNavbar';
import MainFooter from '../components/layout/MainFooter';

const AuthLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      {/* <MainSidebar /> */}
      <Col
        className="main-content p-0"
        lg={{ size: 12 }}
        md={{ size: 9 }}
        sm="12"
        tag="main">
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

AuthLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

AuthLayout.defaultProps = {
  noNavbar: true,
  noFooter: false
};

export default AuthLayout;
