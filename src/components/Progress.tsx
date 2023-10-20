import React, { useState, MouseEvent, useRef, useEffect } from "react";
import "./Progress.css";

import Thumb from "./Thumb";

import {
  calculatePercentage,
  calculateValue,
  calculateWPercentage,
} from "../utils/helper";

interface ProgressProps {
  min?: number;
  max?: number;
  value?: number | [number, number];
  isInputControlled?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  min = 0,
  max = 100,
  value = 50,
  isInputControlled = false,
}) => {
  const [thumbValue, setThumbValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInputControlled) {
      setThumbValue(value);
    }
  }, [value, isInputControlled]);

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && thumbRef.current) {
      const rect = thumbRef.current.getBoundingClientRect();
      const width = rect.width;
      const mouseX = event.clientX - rect.left;
      const newValue = Math.round(calculateValue(mouseX, width, min, max));
      if (event.target instanceof HTMLElement) {
        if (Array.isArray(thumbValue)) {
          if (event.target.classList.contains("thumb-left")) {
            setThumbValue([newValue, thumbValue[1]]);
          } else {
            setThumbValue([thumbValue[0], newValue]);
          }
        } else {
          setThumbValue(newValue);
        }
      }
    }
  };

  return (
    <div
      ref={thumbRef}
      className="progress-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            left: calculatePercentage(
              Array.isArray(thumbValue) ? thumbValue[0] : 0,
              min,
              max
            ),
            position: "absolute",
            width: calculateWPercentage(
              Array.isArray(thumbValue)
                ? Math.abs(thumbValue[1] - thumbValue[0])
                : thumbValue,
              min,
              max
            ),
            backgroundColor: "#91caff",
            borderRadius: "5px",
          }}
        />
      </div>

      <Thumb
        value={Array.isArray(thumbValue) ? thumbValue[0] : thumbValue}
        min={min}
        max={max}
      />
      {Array.isArray(thumbValue) && (
        <Thumb value={thumbValue[1]} min={min} max={max} isRightthumb={true} />
      )}
    </div>
  );
};

export default Progress;
