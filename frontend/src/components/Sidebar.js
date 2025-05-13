import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { to: '/add-room', icon: 'bi-door-open', text: 'Add Room' },
    { to: '/book-room', icon: 'bi-calendar-check', text: 'Book Room' },
    { to: '/staff', icon: 'bi-people', text: 'Staff' },
    { to: '/customer-history', icon: 'bi-book', text: 'Customer History' },
    { to: '/expenses', icon: 'bi-cash-coin', text: 'Expenses' },
    { to: '/accountability', icon: 'bi-graph-up', text: 'Profit' },
    { to: '/balance-sheet', icon: 'bi-journal-text', text: 'Balance Sheet' },
  ];

  return (
    <div className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
      {/* Toggle Button */}
      <div className="toggle-btn">
        <button onClick={handleToggle} className="toggle-button">
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="nav flex-column mt-4">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link className="nav-link" to={item.to}>
              <i className={`bi ${item.icon}`}></i>
              {!collapsed && <span>{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}