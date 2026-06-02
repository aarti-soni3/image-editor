import { useState } from "react";
import { Slider } from "../ui/shadcn templates/slider";

export const CustomSlider = ({ label }) => {
  const [value, setValue] = useState([0]);

  return (
    <div className="flex flex-row justify-between align-middle gap-6">
      <p>{label}</p>
      <Slider
        defaultValue={[75]}
        value={value}
        onValueChange={(value) => setValue([value])}
        max={255}
        step={1}
        className="self-center"
      />
      <p>{value}</p>
    </div>
  );
};
