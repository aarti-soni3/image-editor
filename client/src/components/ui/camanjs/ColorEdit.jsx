import { useContext /*, useEffect*/ } from "react";
import { CustomSlider } from "@/components/ui/camanjs/CustomSlider";
import { FilterContext } from "@/context/createContext";
import { Button } from "../shadcn templates/button";

export const ColorEdit = ({ croppedImageRef }) => {
  const {
    brightness,
    setBrightness,
    saturation,
    setSaturation,
    exposure,
    setExposure,
    contrast,
    setContrast,
    vibrance,
    setVibrance,
    sharpen,
    setSharpen,
    hue,
    setHue,
    sepia,
    setSepia,
    resetFilter,
  } = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <CustomSlider
          label="Brightness"
          value={brightness}
          setValue={(value) => {
            setBrightness(value);
          }}
          min={-100}
          max={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Saturation"
          value={saturation}
          setValue={(value) => {
            setSaturation(value);
          }}
          minValue={-100}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Exposure"
          value={exposure}
          setValue={(value) => {
            setExposure(value);
          }}
          minValue={-100}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Contrast"
          value={contrast}
          setValue={(value) => {
            setContrast(value);
          }}
          minValue={-100}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Vibrance"
          value={vibrance}
          setValue={(value) => {
            setVibrance(value);
          }}
          minValue={-100}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="sharpen"
          value={sharpen}
          setValue={(value) => {
            setSharpen(value);
          }}
          minValue={0}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Hue"
          value={hue}
          setValue={(value) => {
            setHue(value);
          }}
          minValue={0}
          maxValue={360}
          step={1}
          croppedImageRef={croppedImageRef}
        />
        <CustomSlider
          label="Sepia"
          value={sepia}
          setValue={(value) => {
            setSepia(value);
          }}
          minValue={0}
          maxValue={100}
          step={1}
          croppedImageRef={croppedImageRef}
        />
      </div>
      <Button onClick={resetFilter}>Reset Filter</Button>
    </div>
  );
};
