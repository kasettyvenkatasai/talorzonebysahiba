import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/img1.jpg',
    '/img2.avif'

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${image})`,
          }}
          aria-hidden={index !== currentIndex}
        ></div>
      ))}
    </div>
  );
};

export default Home;
