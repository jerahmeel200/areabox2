import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import CinemaEditor from '../components/cinema-manager/CinemaEditor';
import MoviesList from '../components/cinema-manager/MoviesList';

import { database } from '../firebase';
import { off, onValue, ref as refD } from 'firebase/database';

const CinemaManager = () => {
  const [cinemas, setCinemas] = useState([]);
  const ref = refD(database, 'chat/Cinema');

  const loadMovies = () => {
    onValue(
      ref,
      (snapshot) => {
        //database.ref('chat/Cinema').once('value', (snapshot) => {
        const cinemasObj = snapshot.val();
        const cinemasList = Object.keys(cinemasObj).map((key) => ({
          ...cinemasObj[key]
        }));

        setCinemas(cinemasList);
      },
      { onlyOnce: true }
    );
  };

  useEffect(() => {
    loadMovies();
    return () => off(ref); //database.ref('chat/Cinema').off()
  }, []);

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Cinema Manager"
          subtitle="Manage Movies"
          className="text-sm-left"
        />
      </Row>

      <Row>
        {/* Manager */}
        <Col lg="8" md="12">
          <CinemaEditor />
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="4" md="12">
          <MoviesList
            cinemas={cinemas}
            // handleCheck={handleCheck}
            // checkedRooms={checkedRooms}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CinemaManager;
