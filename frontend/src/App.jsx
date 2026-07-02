import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import Visitors from './pages/admin/Visitors';
import Bookings from './pages/admin/Bookings';
import AdminComplaints from './pages/admin/Complaints';
import CustomerDashboard from './pages/customer/Dashboard';
import MyBookings from './pages/customer/MyBookings';
import TablesAvailable from './pages/customer/TablesAvailable';
import CustomerComplaints from './pages/customer/Complaints';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (roleRequired && role !== roleRequired) {
    return role === 'Admin' ? <Navigate to="/admin" /> : <Navigate to="/customer" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute roleRequired="Admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/visitors" element={<PrivateRoute roleRequired="Admin"><Visitors /></PrivateRoute>} />
        <Route path="/admin/bookings" element={<PrivateRoute roleRequired="Admin"><Bookings /></PrivateRoute>} />
        <Route path="/admin/complaints" element={<PrivateRoute roleRequired="Admin"><AdminComplaints /></PrivateRoute>} />

        {/* Customer Routes */}
        <Route path="/customer" element={<PrivateRoute roleRequired="Customer"><CustomerDashboard /></PrivateRoute>} />
        <Route path="/customer/bookings" element={<PrivateRoute roleRequired="Customer"><MyBookings /></PrivateRoute>} />
        <Route path="/customer/tables" element={<PrivateRoute roleRequired="Customer"><TablesAvailable /></PrivateRoute>} />
        <Route path="/customer/complaints" element={<PrivateRoute roleRequired="Customer"><CustomerComplaints /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
