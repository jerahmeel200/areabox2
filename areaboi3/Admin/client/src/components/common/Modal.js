import React from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'shards-react';

export default ({
  modalOpen,
  modalTitle,
  children,
  affirmText,
  action,
  closeModal
}) => (
  <div>
    <Modal open={modalOpen}>
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <button
          onClick={closeModal}
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal">
          Close
        </button>
        <button onClick={action} type="button" className="btn btn-primary">
          {affirmText}
        </button>
      </ModalFooter>
    </Modal>
  </div>
);
