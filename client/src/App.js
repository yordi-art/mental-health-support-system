import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import CounselorDashboard from './components/CounselorDashboard';
import AdminDashboard from './components/AdminDashboard';
import Assessment from './components/Assessment';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-dashboard" element={<PrivateRoute role="client"><ClientDashboard /></PrivateRoute>} />
        <Route path="/therapist-dashboard" element={<PrivateRoute role="therapist"><TherapistDashboard /></PrivateRoute>} />
        <Route path="/counselor-dashboard" element={<PrivateRoute role="counselor"><CounselorDashboard /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/assessment" element={<PrivateRoute role="client"><Assessment /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
