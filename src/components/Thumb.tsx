import React, { useState, useEffect } from "react";
import { calculatePercentage } from "../utils/helper";
import "./Thumb.css";

interface ThumbProps {
  value: number;
  min: number;
  max: number;
  isRightthumb?: boolean;
}

function Thumb({ value, min, max, isRightthumb }: ThumbProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(value);

  useEffect(() => {
    setHoverValue(value);
  }, [value]);

  return (
    <div
      className={`thumb ${isRightthumb ? "thumb-right" : "thumb-left"}`}
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
