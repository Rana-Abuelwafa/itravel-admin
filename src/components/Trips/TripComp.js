import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { GetTrip_Mains } from "../../slices/tripSlice";
import { GetDestination_Mains } from "../../slices/destinationSlice";
import { Form, Row, Col, Button, FormCheck, Table } from "react-bootstrap";
import {
  FaPlus,
  FaTrash,
  FaChevronUp,
  FaEdit,
  FaGlobe,
  FaChevronDown,
  FaImage,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import PopUp from "../Shared/popup/PopUp";
import LoadingPage from "../Loader/LoadingPage";
import { FaX } from "react-icons/fa6";
import "./trips.scss";
function TripComp() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const [destination_id, setDestinationId] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupType, setPopupType] = useState("alert"); // State for popup type
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    trip_default_name: "",
    trip_code: "",
    active: true,
    trip_duration: "",
    pickup: "",
    show_in_top: false,
    show_in_slider: false,
    destination_id: 0,
    route: "",
  });
  const { TripsMain, loading, error } = useSelector((state) => state.trips);
  const { DestinationMain } = useSelector((state) => state.destinations);

  useEffect(() => {
    dispatch(GetDestination_Mains());
    dispatch(GetTrip_Mains(destination_id));
    return () => {};
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(SaveMainDestination(formData)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        setFormData({
          id: 0,
          dest_default_name: "",
          dest_code: "",
          active: true,
          country_code: "",
          route: "",
        });
        let data = { country_code: "", lang_code: "en", currency_code: "" };
        dispatch(GetDestinations(data));
      } else {
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
    });
  };
  return (
    <section className="layout_section">
      <div className="d-flex justify-content-between align-items-center header_title">
        <h2 className="mb-4 page-title">Trips Setting</h2>
        <div className="position-relative" style={{ width: "250px" }}>
          <FaSearch
            className="position-absolute"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
            }}
          />
          <input
            type="text"
            className="form-control ps-6"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: "30px" }}
          />
        </div>
        <Button
          variant="light"
          onClick={() => setFilterExpanded(!filterExpanded)}
          className="filter-toggle-btn mb-4"
        >
          {filterExpanded ? <FaChevronUp /> : <FaChevronDown />}
          <span className="ms-2">Add</span>
        </Button>
      </div>
      {filterExpanded && (
        <Form className="AddEdit_form" onSubmit={onSubmit}>
          <Row>
            <Col md={4}>
              {" "}
              <Form.Group className="mb-3">
                {/* <Form.Label>Code</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Code"
                  name="trip_code"
                  onChange={handleInputChange}
                  required
                  className="formInput"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              {" "}
              <Form.Group className="mb-3">
                {/* <Form.Label>Default Name</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="default name"
                  name="trip_default_name"
                  onChange={handleInputChange}
                  required
                  className="formInput"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              {" "}
              <Form.Group controlId="service">
                {/* <Form.Label>Destination</Form.Label> */}
                <Form.Control
                  as="select"
                  name="destination_id"
                  onChange={handleInputChange}
                  value={formData.destination_id}
                  required
                  className="formInput"
                >
                  <option value="">select Destination</option>
                  {DestinationMain &&
                    DestinationMain?.map((dest, index) => (
                      <option key={index} value={dest.destination_id}>
                        {dest.dest_code} - {dest.dest_default_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3" controlId="packageName">
                <Form.Control
                  type="text"
                  placeholder="duration"
                  name="trip_duration"
                  onChange={handleInputChange}
                  required
                  className="formInput"
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group className="mb-3" controlId="packageName">
                <Form.Control
                  type="text"
                  placeholder="pickup"
                  name="pickup"
                  onChange={handleInputChange}
                  required
                  className="formInput"
                />
              </Form.Group>
            </Col>
            <Col md={2} xs={12}>
              <Form.Group className="mb-3" controlId="packageName">
                <FormCheck
                  type="checkbox"
                  id="show_in_top"
                  label="show in top"
                  name="show_in_top"
                  checked={formData.show_in_top}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      show_in_top: e.target.checked,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} xs={12}>
              <Form.Group className="mb-3" controlId="packageName">
                <FormCheck
                  type="checkbox"
                  id="show_in_slider"
                  label="show in slider"
                  name="show_in_slider"
                  checked={formData.show_in_slider}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      show_in_slider: e.target.checked,
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{ span: 4, offset: 8 }}>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-30 darkBlue-Btn FullWidthBtn"
              >
                <FaPlus className="me-1" /> Add
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      <div className="result_list">
        {" "}
        <Table responsive>
          <thead>
            <tr className="main_row">
              <th>code</th>
              <th>default name</th>
              <th>duration</th>
              <th>pickup</th>
              <th>show in top</th>
              <th>show in slider</th>
              <th>destination</th>
              <th>route</th>
            </tr>
          </thead>
          <tbody>
            {TripsMain &&
              TripsMain.filter((item) =>
                item.dest_default_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ).map((trip, index) => (
                <tr key={index}>
                  <td>{trip.trip_code}</td>
                  <td>{trip.trip_default_name}</td>
                  <td>{trip.trip_duration}</td>
                  <td>{trip.pickup}</td>
                  <td>
                    {trip.show_in_top ? (
                      <FaCheck className="check_icon" />
                    ) : (
                      <FaX className="x_icon" />
                    )}
                  </td>
                  <td>
                    {trip.show_in_slider ? (
                      <FaCheck className="check_icon" />
                    ) : (
                      <FaX className="x_icon" />
                    )}
                  </td>
                  <td>{trip.dest_default_name}</td>
                  <td>{trip.route}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {loading ? <LoadingPage /> : null}
      <PopUp
        show={showPopup}
        closeAlert={() => setShowPopup(false)}
        msg={popupMessage}
        type={popupType}
        autoClose={3000}
      />
    </section>
  );
}

export default TripComp;
