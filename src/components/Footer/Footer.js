import React from 'react'
import './Footer.scss'; // Make sure you have some basic styles defined in Footer.css

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <img src="/bizzbuzzcomics-logo__light.svg" title="BizzBuzzComics.com" className="logo" />
        </div>
        <span className="">© 2014-2024 BizzBuzz Comics by SAD BOI WORKS</span>
        <span class="lnk__index-static"><a href="./index-static.html">index-static.html</a></span>
      </div>
    </footer>
  );
}

export default Footer