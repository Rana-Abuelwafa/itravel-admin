import React, { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  Spinner,
  Form,
  FormCheck,
  Row,
  Col,
  Button,
  Table,
} from "react-bootstrap";
import { GetImgsByDestination } from "../../slices/destinationSlice";
import { useDispatch, useSelector } from "react-redux";

function ImagesModal({
  destination,
  show,
  setShow,
  setPopupMessage,
  setPopupType,
  setShowPopup,
}) {
  const [formData, setFormData] = useState({
    id: 0,
    destination_id: destination.destination_id,
    img_path: "",
    img_name: "",
    is_default: false,
    img_width: 0,
    img_height: 0,
    img_resize_path: "",
  });
  const dispatch = useDispatch();
  const { loading, DestinationImages } = useSelector(
    (state) => state.destinations
  );
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      img: file,
    });
    // Validate file size (2MB limit)
    // if (file.size > 2 * 1024 * 1024) {
    //   setPopupMessage(t("profile.image_size_limit"));
    //   setPopupType("error");
    //   setShowPopup(true);
    //   return;
    // }
  };
  useEffect(() => {
    dispatch(GetImgsByDestination(destination?.destination_id));
    return () => {};
  }, [dispatch]);

  const handleImageSubmit = (e) => {};
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{destination.dest_name} Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleImageSubmit}>
          <Row>
            <Col md={8} xs={12}>
              {" "}
              <Form.Group controlId="formFileMultiple" className="mb-3">
                {/* <Form.Label>Select Images</Form.Label> */}
                <Form.Control
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              {" "}
              <Form.Group className="mb-3" controlId="packageName">
                <FormCheck
                  type="checkbox"
                  id="is_default"
                  label="is default"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{ span: 3, offset: 8 }}>
              {" "}
              <Button type="submit" className="btn darkBlue-Btn FullWidthBtn">
                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="result_list">
          <Table hover>
            <thead className="table-light">
              <tr>
                <th>image</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {DestinationImages &&
                DestinationImages.map((img, index) => (
                  <tr key={img.id}>
                    <td>
                      <img
                        src={img.img_path}
                        alt={img.img_name}
                        className="img-thumbnail"
                        style={{ width: "100px", cursor: "pointer" }}
                        // onClick={() => handleShow(index)}
                      />
                    </td>
                    <td>{img.img_name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ImagesModal;
