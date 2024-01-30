import React from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import FeedCard from '../components/feed/FeedCard';
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

const Feed = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="RSS Feeds"
        subtitle="Latest feeds from the web"
        className="text-sm-left"
      />
    </Row>

    <Row>
      {/* FeedCard */}
      <Col lg="11" md="12">
        <FeedCard />
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="1" md="12">
        {/* <SidebarActions /> */}
        {/* <SidebarCategories /> */}
      </Col>
    </Row>
  </Container>
);

export default Feed;
