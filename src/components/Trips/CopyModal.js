import React from "react";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { CopyTrip } from "../../slices/tripSlice";
import { useDispatch, useSelector } from "react-redux";
function CopyModal({ TripId, show, handleClose }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false); // State for popup visibility
  const [ErrorMessage, setErrorpMessage] = useState(""); // State for popup message
  const [form, setForm] = useState({
    originalTripId: TripId,
    newTripCode: "",
    newTripName: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyTrip = (e) => {
    e.preventDefault();
    dispatch(CopyTrip(form)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowError(false);
        setErrorpMessage("");
        setForm({
          originalTripId: 0,
          newTripCode: "",
          newTripName: "",
        });
        handleClose();
      } else {
        setShowError(true);
        setErrorpMessage(result.payload.errors);
      }
    });
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Copy Trip</Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-modal-body">
        {showError ? <Alert variant={"danger"}>{ErrorMessage}</Alert> : null}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Trip Code</Form.Label>
            <Form.Control
              type="text"
              name="newTripCode"
              placeholder="Enter new trip code"
              value={form.newTripCode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              name="newTripName"
              placeholder="Enter new trip name"
              value={form.newTripName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="custom-modal-footer">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCopyTrip}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CopyModal;
