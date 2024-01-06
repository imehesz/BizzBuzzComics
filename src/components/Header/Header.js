import React, { useState } from 'react';
import './Header.scss'; // Importing the CSS for the Header
import { Link } from 'react-router-dom'

function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <header className="header">
      <img src="/path-to-your-logo.png" alt="BizzBuzz Comics Logo" className="logo" />
      
      <button 
        className="hamburger" 
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        {/* Icon can be replaced with an actual hamburger icon */}
        <span>☰</span>
      </button>

      <nav className={`nav ${isNavExpanded ? 'expanded' : ''}`}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/comics">Comics</Link>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
