import React from "react";
import {
  FaDollarSign,
  FaFileImage,
  FaGlobe,
  FaMapMarked,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function TripsSubMenu({ openMenu }) {
  return (
    <ul className={`submenu ${openMenu === "trips" ? "open" : ""}`}>
      <li>
        <Link to="/trips/translation">
          <FaGlobe />
          Translations
        </Link>
      </li>
      <li>
        <Link to="/trips/prices">
          <FaDollarSign />
          Prices
        </Link>
      </li>
      <li>
        <Link to="/trips/pickups">
          <FaMapMarked />
          Pick ups
        </Link>
      </li>
      <li>
        <Link to="/trips/images">
          <FaFileImage />
          Images
        </Link>
      </li>
    </ul>
  );
}

export default TripsSubMenu;
