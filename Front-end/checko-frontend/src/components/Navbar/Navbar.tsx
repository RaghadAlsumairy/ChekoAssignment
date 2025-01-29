import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";



const Navbar: React.FC = () => {
  return (
    <div className="row ">
      {/* Navbar Links */}
      <div className="col">
        <nav className="navbar">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "nav-item active" : "nav-item";
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item" }
          >
            Map
          </NavLink>
        </nav>
      </div>

      {/* Theme Switcher */}
      <div className="col-auto">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
