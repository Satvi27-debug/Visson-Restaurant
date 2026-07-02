import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Visitors', path: '/admin/visitors' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Complaints', path: '/admin/complaints' },
  ];

  const customerLinks = [
    { name: 'Dashboard', path: '/customer' },
    { name: 'My Bookings', path: '/customer/bookings' },
    { name: 'Tables Available', path: '/customer/tables' },
    { name: 'Complaints', path: '/customer/complaints' },
  ];

  const links = role === 'Admin' ? adminLinks : customerLinks;

  return (
    <div className="app-container">
      <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <h2>Visson</h2>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.name}
          </Link>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="main-content">
        <div className="navbar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
