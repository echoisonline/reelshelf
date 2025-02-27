import React from "react";
import "../styles/CircularRating.css";

const CircularRating = ({ rating }) => {
  const percentage = Math.round(rating * 10); // Переводим рейтинг в проценты
  const radius = 25; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Полный периметр круга
  const offset = circumference - (percentage / 100) * circumference; // Смещение для прогресса

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="circular-rating">
      {/* Внешний серый круг (фон) */}
      <circle cx="40" cy="40" r={radius} className="circle-bg" />

      {/* Внутренний черный круг (фон внутри) */}
      <circle cx="40" cy="40" r="25" className="circle-bg-inner" />

      {/* Прогресс */}
      <circle
        cx="40"
        cy="40"
        r={radius}
        className="circle-progress"
        style={{ strokeDashoffset: offset, strokeDasharray: circumference }}
      />

      {/* Текст внутри круга */}
      <text
        x="50%"
        y="-54%"
        textAnchor="middle"
        dy=".3em"
        className="rating-text"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularRating;
