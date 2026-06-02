import { CustomSlider } from "@/components/Common/CustomSlider";

export const ColorEdit = () => {
  return (
    <div>
      <CustomSlider label="Brightness" />
      <CustomSlider label="saturation" />
      <CustomSlider label="exposure" />
      <CustomSlider label="contrast" />
      <CustomSlider label="vibrance" />
    </div>
  );
};
