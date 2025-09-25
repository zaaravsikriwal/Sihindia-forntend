import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import ASHAWorkerDashboard from './Pages/Asha';
import GovDashboard from './Pages/gov';
function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< LoginPage/>} />
        <Route path="/Asha/Dashboard" element={< ASHAWorkerDashboard/>} />
        <Route path="/Gov/Dashboard" element={< GovDashboard/>} />
        {/* <Route path="/Gov/Dashboard" element={< GovDashboard/>} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  )
}

export default App
