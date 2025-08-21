import React, { useState } from "react";
import TripHeader from "./TripHeader";
function TripPrices() {
  const [trip_id, setTrip_id] = useState(0);
  const handleTripChange = (id) => {
    setTrip_id(id);
  };
  return (
    <section className="layout_section">
      <TripHeader title="Trip Prices" handleTripChange={handleTripChange} />
    </section>
  );
}

export default TripPrices;
