import React, { useState, useEffect } from 'react';
import './Header.scss'; // Importing the CSS for the Header
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [theme, setTheme] = useState('light')
    const [searchWord, setSearchWord] = useState('')

    useEffect(() => {
        // Check for saved theme in local storage or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.className = savedTheme; // Apply the class to the body
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save new theme in local storage
        document.body.className = newTheme; // Apply the class to the body
    }

    const searchComic = () => {
        navigate(`/comics/search/${searchWord}`)
    }
    
    const searchWordChange = (e) => {
        setSearchWord(e.target.value)
    }

  return (
    <header className="header">
        <img src="/path-to-your-logo.png" alt="BizzBuzz Comics Logo" className="logo" />
            <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
            {/* Icon can be replaced with an actual hamburger icon */}
            <span>☰</span>
        </button>

        <div className="search-wrapper">
            <input  value={searchWord} 
                    onChange={searchWordChange} 
                    className="search" 
                    placeholder="Search Comics ...">
            </input>
            <i className="fa fa-search fa_custom" onClick={searchComic}></i>
        </div>

        <nav className={`nav ${isNavExpanded ? 'expanded' : ''}`}>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/comics">Comics</Link>
            <Link to={`/comics/search/${searchWord}`}></Link>
            <a href="#contact">Contact</a>
            <div onClick={toggleTheme} className='theme-toggle'>{theme === 'light' ? '\u{1F312}' : '\u{2600}'}</div>
        </nav>
    </header>
  );
}

export default Header;
