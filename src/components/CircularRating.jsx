import React from "react";
import "../styles/CircularRating.css";

const CircularRating = ({ rating }) => {
  const percentage = Math.round(rating * 10); // Convert rating (e.g., 7.2) to percentage (72)
  const radius = 25; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Full circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Stroke offset to show progress

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="circular-rating">
      {/* Background Circle */}
      <circle cx="40" cy="40" r={radius} className="circle-bg" />

      {/* Progress Circle */}
      <circle
        cx="40"
        cy="40"
        r={radius}
        className="circle-progress"
        style={{ strokeDashoffset: offset, strokeDasharray: circumference }}
      />

      {/* Rating Text in Center */}
      <text
        x="52%"
        y="-48%"
        textAnchor="middle"
        dy=".3em"
        className="rating-text"
        style={{ fontSize: "18px" }}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularRating;
