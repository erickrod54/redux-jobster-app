import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Error, Register } from "./pages";

import { AddJob, AllJobs, Profile, Stats, SharedLayout  } from './pages/dashboard'

/**implementing notifications library */
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**Jobster app - version 5 - App js - Features:
 * 
 *    --> Importing components from dashboard 
 *        directory.
 * 
 *    --> Setting up nested route for 'dashboard'
 * 
 * Note: to set the nested route for dashboard i use
 * the 'SharedLayout' and 'Stats' as index ( i can use 
 * also any other page component ).
 */

function App() {
  return (
    <Router>
      
      <Routes>
        {/**here i set the nested route */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Stats />}/>
          <Route path="/all-jobs" element={<AllJobs />}/>
          <Route path="/add-jobs" element={<AddJob />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>

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
