import React from "react";
import "./ScrollingText.css"; // Import the CSS file

const ScrollingText = () => {
  return (
    <div className="scrolling-text-container">
      <marquee behavior="scroll" direction="left" scrollAmount = "20">
        🎉 Limited-Time Offer! Get up to 50% off on selected items at Mytalorzone By Sahiba. Shop now! 🎉
      </marquee>
    </div>
  );
};

export default ScrollingText;
