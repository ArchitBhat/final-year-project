import React from 'react';
import './Sidebar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className='navbar'>
      <div className="container">
        <div className='nav-padding'>
        <a className="navbar-brand lodge-logo text-light" href="/">
          Gold Castle Lodge
        </a>
        </div>
      </div>
      </div>
    </nav>
  );
}
