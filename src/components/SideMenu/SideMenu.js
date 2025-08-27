import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaCity,
  FaChartSimple,
  FaShip,
  FaChevronRight,
} from "react-icons/fa6";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiDollarSign,
  FiLayers,
} from "react-icons/fi";
import "./SideMenu.scss";
import {
  FaChevronDown,
  FaChevronUp,
  FaGlobe,
  FaInfo,
  FaMap,
  FaMapMarked,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TripsSubMenu from "./TripsSubMenu";
import DestinationSubMenu from "./DestinationSubMenu";
export default function SideMenu() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [destOpenMenu, setDestOpenMenu] = useState(null);
  const [MyName, setMyName] = useState("");
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const toggleSubmenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleDestSubmenu = (menu) => {
    setDestOpenMenu(destOpenMenu === menu ? null : menu);
  };
  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (user) {
        setMyName(`${user.firstName} ${user.lastName}`);
      }
    }
  }, []);

  return (
    <div className={`side-menu ${collapsed ? "collapsed" : ""}`}>
      {/* {!collapsed && <h3>Menu</h3>} */}
      {/* Top Bar with Logo and Toggle */}
      <div className="side-menu-topbar">
        {!collapsed && (
          <img src="images/logo.png" alt="Logo" className="logo" />
        )}
        <button
          className="toggle-button"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {!collapsed ? (
            <FiChevronLeft size={20} />
          ) : (
            <FiChevronRight size={20} />
          )}
        </button>
      </div>
      <ul>
        <li>
          <Link to="/dashboard">
            <FaChartSimple /> <span className="menu-label">Dashboard</span>
          </Link>
        </li>
        <li>
          <div
            className={`menu-item ${
              destOpenMenu === "destinations" ? "open" : ""
            }`}
          >
            <Link to="/destinations" className="left">
              <FaCity />
              <span className="menu-label">Destinations</span>
            </Link>
            {!collapsed && (
              <span
                className="arrow"
                onClick={() => toggleDestSubmenu("destinations")}
              >
                <FaChevronDown className="arrow" />
              </span>
            )}
          </div>
          <DestinationSubMenu openMenu={destOpenMenu} />
        </li>
        {/* <li>
          <Link to="/destinations">
            <FaCity /> <span className="menu-label">Destinations</span>
          </Link>
        </li> */}
        {/* <li>
          <Link to="/trips">
            <FaShip /> <span className="menu-label">Trips</span>
          </Link>
        </li> */}
        <li>
          <div className={`menu-item ${openMenu === "trips" ? "open" : ""}`}>
            <Link to="/trips" className="left">
              <FaShip />
              <span className="menu-label">Trips</span>
            </Link>
            {!collapsed && (
              <span className="arrow" onClick={() => toggleSubmenu("trips")}>
                <FaChevronDown className="arrow" />
                {/* {openMenu ? (
                  <FaChevronUp className="arrow" />
                ) : (
                  <FaChevronDown className="arrow" />
                )} */}
              </span>
            )}
          </div>
          <TripsSubMenu openMenu={openMenu} />
          {/* <ul className={`submenu ${openMenu === "trips" ? "open" : ""}`}>
            <li>
              <Link to="/trips/translation">
                <FaGlobe />
                Translations
              </Link>
            </li>
            <li>
              <Link to="/trips/pickups">
                <FaMapMarked />
                Pick ups
              </Link>
            </li>
          </ul> */}
        </li>
        {/* <li>
          <button
            className={`menu-item ${openMenu === "trips" ? "open" : ""}`}
            onClick={() => toggleSubmenu("trips")}
          >
            <FaShip />
            <span className="menu-label">Trips</span>
            {openMenu ? (
              <FaChevronUp className="arrow" />
            ) : (
              <FaChevronDown className="arrow" />
            )}
          </button>
          <ul className={`submenu ${openMenu === "trips" ? "open" : ""}`}>
            <li>
              <Link to="/trips/translation">
                <FaGlobe />
                Translations
              </Link>
            </li>
            <li>
              <Link to="/trips/pickups">
                <FaMapMarked />
                Pick ups
              </Link>
            </li>
          </ul>
        </li> */}
        <li>
          <Link to="/facility">
            <FaInfo /> <span className="menu-label">Facilities Setting</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/transfer">
            <FaCar /> <span className="menu-label">Transfer</span>
          </Link>
        </li> */}
      </ul>
      {/* Bottom Section */}
      <div className="side-menu-footer">
        <div className="footer-content">
          <div className="user-info">
            <FiUser className="user-icon" />
            {!collapsed && <span className="user-title">{MyName}</span>}
          </div>

          <div className="menu-actions">
            <button className="menu-action-button">
              <FiSearch className="action-icon" />
              {!collapsed && <span>Search</span>}
            </button>

            {MyName && (
              <button className="menu-action-button" onClick={logOut}>
                <FiLogOut className="action-icon" />
                {!collapsed && <span>Logout</span>}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <button
        className="collapse-btn"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? "➡️" : "⬅️"}
      </button> */}
    </div>
  );
}
