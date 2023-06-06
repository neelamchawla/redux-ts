import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartsMap from "./components/ChartsMap/ChartsMap";
import Contact from "./components/ContactPage/Contact";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
    
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/ChartsMap" element={<ChartsMap />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;