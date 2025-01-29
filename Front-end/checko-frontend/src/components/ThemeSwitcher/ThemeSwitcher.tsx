import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeSwitcher.css";

const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeTheme = () => {
    const root = document.documentElement;

    // Toggle the dark mode state
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      if (newMode) {
        root.style.setProperty("--primary-color", "#1e1e1e");
        root.style.setProperty("--secondary-color", "#333");
        root.style.setProperty("--background-color", "Black");
        root.style.setProperty("--text-color", "white");
        root.style.setProperty("--text-button-color", "#F4CBDF");
        document.body.classList.add("dark-mode");
      } else {
        root.style.setProperty("--primary-color", "#F4CBDF");
        root.style.setProperty("--secondary-color", "white");
        root.style.setProperty("--background-color", "#f0f0f0");
        root.style.setProperty("--text-color", "#333");
        root.style.setProperty("--text-button-color", "black");
        document.body.classList.remove("dark-mode");

      }

      return newMode; // Return the updated state
    });
  };

  return (
    <div className="d-flex align-items-center">
      <FaSun className="mr-3 pb-1" />
      <div className="form-check form-switch rotate-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isDarkMode}
          onChange={changeTheme}
        />
      </div>
      <FaMoon className="ml-3 pt-2" />
    </div>
  );
};

export default ThemeSwitcher;
