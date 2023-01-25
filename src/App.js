import React from 'react';
//React Router being used for SPA functionality
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Component Imports
import Home from './components/home/Home';
import PoliticianComparison from './components/features/PoliticianComparison/PoliticianComparison';
import SignUp from './components/sign-up/SignUp';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Dashboard from './components/features/Dashboard/Dashboard';
import PoliticianProfile from './components/features/PoliticianProfile/ProfileFull';
import Navigation from './components/Nav/Navigation'
import DistrictMapPage from './components/features/DistrictMap/DistrictMapPage';
import Donations from './components/features/Donations/Donations';
import BillFeed from './components/features/BillFeed/BillFeed';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Badge} from 'react-bootstrap';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison/" element={<PoliticianComparison />} />
        <Route path="/profile/:search" element={<PoliticianProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/:address" element={<Dashboard />} />
        <Route path="/districtmap" element={<DistrictMapPage />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/feed" element={<BillFeed />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
