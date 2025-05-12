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
    localStorage.removeItem('token'); // Clear token from storage
    navigate('/login'); // Redirect to login
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"} style={{ position: 'relative' }}>
      {/* Toggle Button */}
      <div className="toggle-btn text-end p-2">
        <button onClick={handleToggle} className="btn btn-outline-light btn-sm">
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/add-room">
            <i className="bi bi-door-open"></i> {!collapsed && "Add Room"}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/book-room">
            <i className="bi bi-calendar-check"></i> {!collapsed && "Book Room"}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/staff">
            <i className="bi bi-people"></i> {!collapsed && "Staff "}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/customer-history">
            <i className="bi bi-book"></i> {!collapsed && "Customer History"}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/expenses">
            <i className="bi bi-cash-coin"></i> {!collapsed && "Expenses"}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/accountability">
            <i className="bi bi-graph-up"></i> {!collapsed && "Profit"}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/balance-sheet">
            <i className="bi bi-journal-text"></i> {!collapsed && "Balance Sheet"}
          </Link>
        </li>
      </ul>

      {/* Logout Button at Bottom */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center'
      }}>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}