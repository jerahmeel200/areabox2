import React from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import LoginPage from '../components/login';
// import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from '../components/add-new-post/SidebarCategories';

const Login = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Admin Login" className="text-sm-left" />
    </Row>

    <Row>
      {/* Login */}
      <Col lg="12" md="12">
        <LoginPage />
      </Col>

      {/* Sidebar Widgets */}
      {/* <Col lg="3" md="12"> */}
      {/* <SidebarActions /> */}
      {/* <SidebarCategories /> */}
      {/* </Col> */}
    </Row>
  </Container>
);

export default Login;
