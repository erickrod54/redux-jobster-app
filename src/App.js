import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Error, Dashboard, Register } from "./pages";

/**Jobster app - version 1 - App js - Features:
 * 
 *    --> Importing and placing 'Landing, 'Error', 
 *       'Dashboard', 'Register'.
 * 
 *    --> Building Routing for very Page 
 *        Component.
 * 
 * Note: this is part of the first changes to
 * Jobster app
 */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/landing" element={<Landing />}/>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </Router>
  );
}

export default App;
