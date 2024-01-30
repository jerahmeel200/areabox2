import React, { useState, useContext } from 'react';
import {
  Card,
  CardBody,
  Form,
  FormInput,
  ListGroupItem,
  Button
} from 'shards-react';
import Modal from '../common/Modal';
import useDatabase from '../../hooks/useDatabase';

import { AuthContext } from '../../context/Context';

const CinemaPreview = () => {
  const [movieCID, setMovieCID] = useState('');
  const [title, setTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const db = useDatabase();
  const {
    user: { userName }
  } = useContext(AuthContext);

  const cidChange = ({ target: { value } }) => {
    setMovieCID(value);
  };

  const titleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const handleSave = () => {
    if (!movieCID || !title) {
      return;
    }

    let writes = 1;
    db.saveDocument('Cinema', { title, movieCID, userName }, 1, writes, () => {
      setTitle('');
      setMovieCID('');
      setModalOpen(false);
    });
  };

  const movieToPost = () => {
    return !movieCID || !title ? (
      <h4>Please make sure you have entered a valid CID and title</h4>
    ) : (
      <div>
        <span className="bold">
          <h5>Movie CID</h5>
        </span>
        <p>{movieCID}</p>
        <span className="bold">
          <h5>Movie Title</h5>
        </span>
        <p>{title}</p>
      </div>
    );
  };

  return (
    <>
      {modalOpen ? (
        <Modal
          modalOpen={modalOpen}
          modalTitle="Post this movie"
          children={movieToPost()}
          affirmText="Post"
          action={handleSave}
          closeModal={() => setModalOpen(false)}
        />
      ) : null}

      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="Movie CID e.g. QmeMrTDkJhikJkqb2bRiS2uhBGJCmq67BPLbm4Tjvibopq"
              value={movieCID}
              onChange={cidChange}
            />
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="Movie Title e.g. Terminator 3"
              value={title}
              onChange={titleChange}
            />
            <label>Movie Preview</label>
            <video
              src={movieCID ? `https://ipfs.io/ipfs/${movieCID}` : ''}
              autoPlay
              controls
              width="100%"
              height="100%"></video>
          </Form>
        </CardBody>

        <ListGroupItem className="d-flex px-3 border-0">
          <Button
            onClick={() => setModalOpen(true)}
            theme="accent"
            size="sm"
            className="ml-auto">
            <i className="material-icons">file_copy</i> Post Movie
          </Button>
        </ListGroupItem>
      </Card>
    </>
  );
};

export default CinemaPreview;
