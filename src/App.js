import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing, Error, Register, ProtectedRoute } from "./pages";

import { AddJob, AllJobs, Profile, Stats, SharedLayout  } from './pages/dashboard'

/**implementing notifications library */
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**Jobster app - version 6 - App js - Features:
 * 
 *    --> Implementing 'ProtectedRoute' on the 
 *        SharedLayout and nested Routes.
 * 
 * Note: the 'ProtectedRoute' will protect all
 * the dashboard directory.
 */

function App() {
  return (
    <Router>
      
      <Routes>
        {/**here i set the nested route */}
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />}/>
          <Route path="/all-jobs" element={<AllJobs />}/>
          <Route path="/add-job" element={<AddJob />}/>
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
