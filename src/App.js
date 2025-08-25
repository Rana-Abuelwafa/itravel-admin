import logo from "./logo.svg";
import "./App.css";
import "./styles/shared.scss";
// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/dashboard";
import Trips from "./components/Trips/TripComp";
import MainLayout from "./components/MainLayout";
import DestinationComp from "./components/Destinations/DestinationComp";
import TripTranslation from "./components/Trips/TripTranslation";
import TripPrices from "./components/Trips/TripPrices";
import TripPickUps from "./components/Trips/TripPickUps";
import TripImages from "./components/Trips/TripImages";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login page outside layout */}
        <Route path="/login" element={<Login />} />

        {/* Routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/destinations" element={<DestinationComp />} />

          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/translation" element={<TripTranslation />} />
          <Route path="/trips/prices" element={<TripPrices />} />
          <Route path="/trips/pickups" element={<TripPickUps />} />
          <Route path="/trips/images" element={<TripImages />} />
        </Route>

        {/* Redirect to login for unknown paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
