import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import "./App.css";
import { useEffect } from "react";
import useMenu from "./stores/menuStore";

function App() {
  const { fetchMenu } = useMenu();
  useEffect(() => {
    // Fetch the menu data once when the app mounts
    fetchMenu();
  }, [fetchMenu]);

  return (
    <BrowserRouter>
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
