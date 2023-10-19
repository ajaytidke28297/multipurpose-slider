import React from "react";
import "./Progress.css";

import Thumb from "./Thumb";

import { calculatePercentage, calculateWPercentage } from "../utils/helper";

interface ProgressProps {
  min: number;
  max: number;
  value: number | [number, number];
}

const Progress: React.FC<ProgressProps> = ({ min, max, value }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            left: calculatePercentage(
              Array.isArray(value) ? value[0] : 0,
              min,
              max
            ),
            position: "absolute",
            width: calculateWPercentage(
              Array.isArray(value) ? Math.abs(value[1] - value[0]) : value,
              min,
              max
            ),
            backgroundColor: "#91caff",
            borderRadius: "5px",
          }}
        />
      </div>

      <Thumb value={value} min={min} max={max} />
      {Array.isArray(value) && (
        <Thumb value={value} min={min} max={max} isRightthumb={true} />
      )}
    </div>
  );
};

export default Progress;
