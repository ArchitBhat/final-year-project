import React from 'react';
import './Sidebar.css';

export default function Navbar() {
  return (
    <nav className="navbar sticky-top shadow-sm py-2 custom-navbar">
      <div className="container d-flex justify-content-center">
        <a className="navbar-brand m-0 responsive-brand" href="/">
          GOLD CASTLE LODGE
        </a>
      </div>
    </nav>
  );
}
