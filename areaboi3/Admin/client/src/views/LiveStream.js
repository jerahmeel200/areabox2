import React from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import StreamCard from '../components/livestream/StreamCard';
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

const LiveStream = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Start New LiveStream"
        subtitle="LiveStream"
        className="text-sm-left"
      />
    </Row>

    <Row>
      {/* StreamCard */}
      <Col lg="9" md="12">
        <StreamCard />
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12">
        {/* <SidebarActions /> */}
        {/* <SidebarCategories /> */}
      </Col>
    </Row>
  </Container>
);

export default LiveStream;
