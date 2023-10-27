import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationPopup = ({ show, message, onConfirm, onCancel }) => {
  return (
      <Modal show={show} onHide={onCancel} centered>
        <Modal.Body>
          <h6>{message}</h6>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button style={{ width: "6em" }} variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button style={{ width: "6em", marginLeft: '10px' }} variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default ConfirmationPopup;
