import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
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

import 'react-quill/dist/quill.snow.css';
import '../../assets/quill.css';

// import * as ROLES from '../../roles';
import { AuthContext } from '../../context/Context';
import { doc, setDoc } from 'firebase/firestore';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['clean']
  ]
};

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'align',
  'color',
  'background'
];

const Editor = ({ checkedRooms, setCheckedRooms }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const db = useDatabase();
  const {
    user: { userName }
  } = useContext(AuthContext);

  const titleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const editorChange = (content, delta, source, editor) => {
    setContent(content);
    setContentLength(editor.getLength());
  };

  console.log('Room key: ', checkedRooms);

  const handleSave = () => {
    if (contentLength <= 1 || checkedRooms.length < 1) {
      return;
    }

    let writes = 0;
    checkedRooms.forEach(({ key }) => {
      writes++;

      // setDoc(doc(db,key), )
      db.saveDocument(
        key,
        { title, content, userName },
        checkedRooms.length,
        writes,
        () => {
          setTitle('');
          setContent('');
          setModalOpen(false);
          setCheckedRooms([]);
        }
      );
    });
  };

  const selectedRooms = () => (
    <ul className="list-unstyled list-group overflow-auto">
      {checkedRooms &&
        checkedRooms.map(({ title }, index) => (
          <li key={index} className="list-group-item">
            {title}
          </li>
        ))}
    </ul>
  );

  return (
    <>
      {modalOpen ? (
        <Modal
          modalOpen={modalOpen}
          modalTitle="Publish to these Channel(s)"
          children={selectedRooms()}
          affirmText="Publish"
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
              placeholder="Your Post Title"
              value={title}
              onChange={titleChange}
            />
            <ReactQuill
              className="add-new-post__editor mb-1"
              modules={modules}
              formats={formats}
              value={content}
              onChange={editorChange}
            />
          </Form>
        </CardBody>

        <ListGroupItem className="d-flex px-3 border-0">
          {/* <Button outline theme="accent" size="sm">
            <i className="material-icons">save</i> Save Draft
          </Button> */}

          <Button
            onClick={() => setModalOpen(true)}
            theme="accent"
            size="sm"
            className="ml-auto">
            <i className="material-icons">file_copy</i> Publish
          </Button>
        </ListGroupItem>
      </Card>
    </>
  );
};

// <button onClick={makeAdmin}>make Admin</button>
// const roles = {};

// const makeAdmin = () => {
//   roles[ROLES.SUPERADMIN] = ROLES.SUPERADMIN;
//   database.ref('users').child('Femi Akeredolu').child('roles').update({
//     ADMIN: ROLES.ADMIN
//   })
// }

export default Editor;
