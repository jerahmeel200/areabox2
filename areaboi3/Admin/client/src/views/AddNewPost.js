import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import Editor from '../components/add-new-post/Editor';
// import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from '../components/add-new-post/SidebarCategories';

import { database } from '../firebase';
import { off, onValue, ref as refD } from 'firebase/database';

const AddNewPost = () => {
  const [channels, setChannels] = useState([]);
  const [checkedRooms, setCheckedRooms] = useState([]);

  const ref = refD(database, 'rooms');

  const handleCheck = ({ key, title }) => {
    setCheckedRooms(
      checkedRooms.some((room) => room.key === key)
        ? checkedRooms.filter((c) => c.key !== key)
        : [...checkedRooms, { key, title }]
    );
  };

  const loadChannels = () => {
    onValue(
      ref,
      (snapshot) => {
        //database.ref('rooms').once('value', (snapshot) => {
        const channelsObj = snapshot.val();
        const channelsList = Object.keys(channelsObj).map((key) => ({
          ...channelsObj[key]
        }));

        setChannels(channelsList);
      },
      { onlyOnce: true }
    );
  };

  useEffect(() => {
    loadChannels();
    return () => off(ref); //database.ref('rooms').off()
  }, []);

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add New Post"
          subtitle="Blog Posts"
          className="text-sm-left"
        />
      </Row>

      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Editor
            checkedRooms={checkedRooms}
            setCheckedRooms={setCheckedRooms}
          />
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          {/* <SidebarActions /> */}
          <SidebarCategories
            channels={channels}
            handleCheck={handleCheck}
            checkedRooms={checkedRooms}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewPost;
