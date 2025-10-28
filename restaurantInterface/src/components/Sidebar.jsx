import React from "react";
import "../cssFiles/sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { IoRestaurant } from "react-icons/io5";
import analyis from "../assets/sidebar/analysis.png";
import tables from "../assets/sidebar/tables.png";
import menuItems from "../assets/sidebar/menuItems.png";
import orderLine from "../assets/sidebar/orderLine.png";

function Sidebar() {
  const items = useMemo(
    () => [
      { path: "/", icon: analyis },
      { path: "/tracker", icon: tables },
      { path: "/analysis", icon: orderLine },
      { path: "/configuration", icon: menuItems },
    ],
    []
  );

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="restro-icon">
        <IoRestaurant size={50} />
      </div>
      <div className="sidebar-items">
        {items.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className="navlink-reset">
              <div
                className={`sidebar-item ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                <div className="sidebar-item-content">
                  <div
                    className={`logo ${
                      isActive(item.path) ? "imgColor bgIcon" : ""
                    }`}
                  >
                    <img src={item.icon} />
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
