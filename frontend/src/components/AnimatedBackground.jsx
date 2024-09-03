import React from "react";
import "../App.css"; 

const AnimatedBackground = () => {
  const bubbleArray = Array.from({ length: 60 }, (_, i) => (
    <span key={i} style={{ "--i": Math.floor(Math.random() * 30 + 1) }}></span>
  ));

  return (
    <div className="container">
      <div className="bubbles">{bubbleArray}</div>
    </div>
  );
};

export default AnimatedBackground;
