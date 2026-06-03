import { Slider } from "../shadcn templates/slider";

export const CustomSlider = ({ label, value, setValue, maxValue, step }) => {
  return (
    <div className="flex flex-row justify-between align-middle gap-6">
      <p>{label}</p>
      <Slider
        value={value}
        onValueChange={(value) => setValue(value)}
        max={maxValue}
        step={step}
        className="self-center"
      />
      <p>{value}</p>
    </div>
  );
};
