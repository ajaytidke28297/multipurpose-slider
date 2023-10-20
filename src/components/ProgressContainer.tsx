import React, { useRef, useState } from "react";
import Progress from "./Progress";

function ProgressContainer() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<number>(10);

  const setInputHandler = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const numericValue = parseInt(inputValue);

      if (!isNaN(numericValue)) {
        setValue(numericValue);
      }
    }
  };

  return (
    <>
      <h3>Should be single value by default</h3>
      <Progress min={0} max={100} value={30} />

      <h3>Should have possibility to become range slider</h3>
      <Progress min={-50} max={50} value={[-20, 10]} />

      <h3>Should have possibility to become range slider</h3>
      <Progress min={0} max={100} value={value} isInputControlled={true} />
      <br />
      <input type="number" ref={inputRef} onChange={setInputHandler} />
    </>
  );
}

export default ProgressContainer;
