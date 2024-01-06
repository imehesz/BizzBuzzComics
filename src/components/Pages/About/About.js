import React from 'react';
import './About.scss'; // Make sure to create an About.css file for styling

function About() {
  return (
    <div className="about">
      <h1>About BizzBuzz Comics</h1>
      <p>
        Welcome to BizzBuzz Comics, your go-to destination for immersive and captivating storytelling.
        Discover a world of comics that span genres and styles, created by a community of talented artists.
        Dive into epic adventures, heartfelt stories, and thought-provoking narratives.
        Enjoy the magic of comics in a platform built for readers and creators alike.
      </p>
      {/* You can add more content here such as images, team member profiles, etc. */}
    </div>
  );
}

export default About
