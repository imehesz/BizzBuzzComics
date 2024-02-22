import React, { useState, useEffect } from 'react';
import './Header.scss'; // Importing the CSS for the Header
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        // Check for saved theme in local storage or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.body.className = savedTheme; // Apply the class to the body
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save new theme in local storage
        document.body.className = newTheme; // Apply the class to the body
    }

  return (
    <header className="header">
        <div className='nav-wrapper'>
            <a href="//bizzbuzzcomics.com"><img src="/logo-top_v2.png" title="BizzBuzzComics.com" className="logo" /></a>
            <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                <span>☰</span>
            </button>

            <nav className={`nav ${isNavExpanded ? 'expanded' : ''}`}>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/comics">Comics</Link>
                <a href="#contact">Contact</a>
                { /* <div onClick={toggleTheme} className='theme-toggle'>{theme === 'light' ? '\u{1F312}' : '\u{2600}'}</div> */ }
            </nav>
        </div>
    </header>
  );
}

export default Header;
