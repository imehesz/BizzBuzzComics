import React, { useState, useEffect } from 'react';

import './Slideshow.scss'

const Slideshow = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000); // Switch to the next slide every 5 seconds

        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, [slides.length]);

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div key={index} className={index === currentSlide ? 'slide active' : 'slide'}>
                    {index === currentSlide && (
                        <>
                            <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                <img src={slide.url} alt={slide.description} />
                            </a>
                        </>
                    )}
                </div>
            ))}
            <button className="prev" onClick={prevSlide}>&#9664;</button>
            <button className="next" onClick={nextSlide}>&#9654;</button>
        </div>
    );
};

export default Slideshow