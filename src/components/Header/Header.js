import React, { useState } from 'react';
import './Header.scss'; // Importing the CSS for the Header
import { Link } from 'react-router-dom'

function Header() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    
    /* TODO This was an idea for theme selection, maybe we'll get to it later ;)
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
    */

  return (
    <header className="header">
        <div className='nav-wrapper'>
            <a href="//bizzbuzzcomics.com"><img src="/logo-top_v2.png" title="BizzBuzzComics.com" className="logo" alt="logo" /></a>
            <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                { !isNavExpanded && <span>☰</span>}
                { isNavExpanded && <span>X</span>}
            </button>

            <nav className={`nav ${isNavExpanded ? 'expanded' : ''}`}>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/comics">Comics</Link>
                <Link to="/contact">Contact</Link>
                { /* <div onClick={toggleTheme} className='theme-toggle'>{theme === 'light' ? '\u{1F312}' : '\u{2600}'}</div> */ }
            </nav>
        </div>
    </header>
  );
}

export default Header;
