import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCar, FaCity, FaChartSimple, FaShip } from "react-icons/fa6";
import {
  FiHome,
  FiHelpCircle,
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
export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const logOut = {};
  return (
    <div className={`side-menu ${collapsed ? "collapsed" : ""}`}>
      {/* {!collapsed && <h3>Menu</h3>} */}
      {/* Top Bar with Logo and Toggle */}
      <div className="side-menu-topbar">
        {!collapsed && (
          <img src="./images/logo.png" alt="Logo" className="logo" />
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
          <Link to="/destinations">
            <FaCity /> <span className="menu-label">Destinations</span>
          </Link>
        </li>
        <li>
          <Link to="/trips">
            <FaShip /> <span className="menu-label">Trips</span>
          </Link>
        </li>
        <li>
          <Link to="/transfer">
            <FaCar /> <span className="menu-label">Transfer</span>
          </Link>
        </li>
      </ul>
      {/* Bottom Section */}
      <div className="side-menu-footer">
        <div className="footer-content">
          <div className="user-info">
            <FiUser className="user-icon" />
            {/* {!collapsed && <span className="user-title">{MyName}</span>} */}
          </div>

          <div className="menu-actions">
            <button className="menu-action-button">
              <FiSearch className="action-icon" />
              {!collapsed && <span>Search</span>}
            </button>

            {/* {MyName && ( */}
            <button className="menu-action-button" onClick={logOut}>
              <FiLogOut className="action-icon" />
              {!collapsed && <span>Logout</span>}
            </button>
            {/* )} */}
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
