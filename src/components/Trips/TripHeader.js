import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { GetTrip_Mains } from "../../slices/tripSlice";
function TripHeader({ title, handleTripChange }) {
  const dispatch = useDispatch();
  const [trip_id, setTrip_id] = useState(0);

  const { TripsMain, loading, error } = useSelector((state) => state.trips);
  useEffect(() => {
    dispatch(GetTrip_Mains(0));
    return () => {};
  }, [dispatch]);
  const handleChange = (e) => {
    const id = e.target.value;
    setTrip_id(id);
    handleTripChange(id);
  };
  return (
    <div className="d-flex justify-content-between align-items-center header_title">
      <h2 className="mb-4 page-title">{title}</h2>
      <div className="position-relative">
        <Form.Group>
          {/* <Form.Label>Destination</Form.Label> */}
          <Form.Control
            as="select"
            name="trip_id"
            onChange={handleChange}
            value={trip_id}
            required
            className="formInput"
          >
            <option value="">select trip</option>
            {TripsMain &&
              TripsMain?.map((trip, index) => (
                <option key={index} value={trip.id}>
                  {trip.trip_code} - {trip.trip_default_name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
}

export default TripHeader;
