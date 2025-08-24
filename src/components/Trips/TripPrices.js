import React, { useEffect, useState } from "react";
import TripHeader from "./TripHeader";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { GetTrip_Prices, SaveTripPrices } from "../../slices/tripSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../Shared/popup/PopUp";
import { FiRefreshCcw } from "react-icons/fi";
const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "EGP", symbol: "EGP" },
]; // Available currencies
function TripPrices() {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupType, setPopupType] = useState("alert"); // State for popup type
  const [trip_id, setTrip_id] = useState(0);
  const [isUpdate, setIsUpdate] = useState(0);
  const [formData, setFormData] = useState({
    id: 0,
    trip_id: trip_id,
    trip_origin_price: 0,
    trip_sale_price: 0,
    currency_code: "",
    delete: false,
  });
  //   useEffect(() => {
  //     dispatch(GetTrip_Prices(trip_id));
  //     return () => {};
  //   }, [dispatch]);

  const handleTripChange = (id) => {
    setTrip_id(id);
    dispatch(GetTrip_Prices(id));
  };
  const { loading, error, TripPriceList } = useSelector((state) => state.trips);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDeleteClick = (price) => {
    let data = {
      id: price.id,
      trip_id: trip_id,
      trip_origin_price: price.trip_origin_price,
      trip_sale_price: price.trip_sale_price,
      currency_code: price.currency_code,
      delete: true,
    };
    dispatch(SaveTripPrices(data)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        dispatch(GetTrip_Prices(trip_id));
      } else {
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    formData["trip_id"] = trip_id;
    dispatch(SaveTripPrices(formData)).then((result) => {
      if (result.payload && result.payload.success) {
        setShowPopup(false);
        dispatch(GetTrip_Prices(trip_id));
      } else {
        setPopupType("error");
        setShowPopup(true);
        setPopupMessage(result.payload.errors);
      }
      setIsUpdate(false);
      setFormData({
        id: 0,
        trip_id: 0,
        trip_origin_price: 0,
        trip_sale_price: 0,
        currency_code: "",
        delete: false,
      });
    });
  };
  const resetForm = () => {
    setIsUpdate(false);
    setFormData({
      id: 0,
      trip_id: 0,
      trip_origin_price: 0,
      trip_sale_price: 0,
      currency_code: "",
      delete: false,
    });
  };
  const handleEdit = (trip) => {
    setIsUpdate(true);
    setFormData({
      id: trip.id,
      trip_id: trip_id,
      trip_origin_price: trip.trip_origin_price,
      trip_sale_price: trip.trip_sale_price,
      currency_code: trip.currency_code,
      delete: false,
    });
  };
  return (
    <section className="layout_section">
      <TripHeader title="Trip Prices" handleTripChange={handleTripChange} />
      <hr className="divider" />
      {trip_id > 0 ? (
        <>
          <Form onSubmit={handleAdd} className="form_crud">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    value={formData.trip_origin_price}
                    name="trip_origin_price"
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Sale Price</Form.Label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    placeholder="Enter sale price"
                    value={formData.trip_sale_price}
                    name="trip_sale_price"
                    onChange={handleInputChange}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="curr_code">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    as="select"
                    name="currency_code"
                    value={formData.currency_code}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={""}>select Currency</option>
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {isUpdate ? (
                <>
                  <Col xs={12} md={{ span: 2, offset: 8 }}>
                    {" "}
                    <Button className="darkBlue-Btn FullWidthBtn" type="submit">
                      <FaUpload className="me-1" /> update
                    </Button>
                  </Col>
                  <Col xs={12} md={2}>
                    <Button
                      className="purble-btn FullWidthBtn"
                      onClick={resetForm}
                    >
                      <FiRefreshCcw className="me-1" /> Reset
                    </Button>
                  </Col>
                </>
              ) : (
                <Col xs={12} md={{ span: 4, offset: 8 }}>
                  <Button className="darkBlue-Btn FullWidthBtn" type="submit">
                    <FaPlus className="me-1" /> Add
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
          <hr className="divider" />
          <div className="result_list">
            {" "}
            {TripPriceList && TripPriceList.length > 0 && (
              <Table responsive>
                <thead>
                  <tr className="main_row">
                    <th>Origin Price</th>
                    <th>Sale Price</th>
                    <th>Currency</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {TripPriceList.map((price, index) => (
                    <tr key={index}>
                      <td>{price.trip_origin_price}</td>
                      <td>{price.trip_sale_price}</td>
                      <td>{price.currency_code}</td>
                      <td>
                        <div className="d-flex btn-lst">
                          <button
                            className="btn btn-sm action_btn yellow-btn"
                            onClick={() => handleEdit(price)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger action_btn"
                            onClick={() => handleDeleteClick(price)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </>
      ) : (
        <div className="centerSection">
          <p>No data</p>
        </div>
      )}

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

export default TripPrices;
