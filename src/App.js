import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Error, Dashboard, Register } from "./pages";

/**implementing notifications library */
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**Jobster app - version 3 - App js - Features:
 * 
 *    --> Importing and placing 'ToastContainer' 
 *        to handle notifications
 * 
 *    --> Customizing styles for 'ToastContainer'. 
 * 
 * Note: i place the 'ToastContainer' in a root
 * directory
 * 
 * By the toastify documentation the 'ToastContainer'
 * is targeted by the name 'Toastify__toast' and all
 * kind of styles can be applied.
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
      {/**i place the ToastContainer -outside the routes-
       * in order to render it*/}
      <ToastContainer position="top-center"/>
    </Router>
  );
}

export default App;
