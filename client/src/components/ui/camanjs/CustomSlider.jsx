import { useState } from "react";
import { Slider } from "../shadcn templates/slider";

export const CustomSlider = ({ label, value, setValue, maxValue, step }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const displayValue = isDragging ? localValue : value;

  const handleValueChange = (value) => {
    setIsDragging(true);
    setLocalValue(value);
  };

  const handleValueCommitted = (value) => {
    setIsDragging(false);
    setValue(value);
  };

  return (
    <div className="flex flex-row align-middle gap-6">
      <p className="w-2/5">{label}</p>
      <Slider
        value={displayValue}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommitted}
        max={maxValue}
        step={step}
        className="self-center"
      />
      <p className="w-1/4">{displayValue}</p>
    </div>
  );
};
