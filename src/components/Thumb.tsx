import React, { useState } from "react";
import { calculatePercentage } from "../utils/helper";
import "./Thumb.css";

interface ThumbProps {
  value: number | [number, number];
  min: number;
  max: number;
  isRightthumb?: boolean;
}

function Thumb({ value, min, max, isRightthumb }: ThumbProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div
      className="thumb"
      style={{
        left: calculatePercentage(
          Array.isArray(value) ? (isRightthumb ? value[1] : value[0]) : value,
          min,
          max
        ),
      }}
      onMouseEnter={() =>
        setHoverValue(
          Array.isArray(value) ? (isRightthumb ? value[1] : value[0]) : value
        )
      }
      onMouseLeave={() => setHoverValue(null)}
    >
      {hoverValue !== null && <div className="tooltip">{hoverValue}</div>}
    </div>
  );
}

export default Thumb;
