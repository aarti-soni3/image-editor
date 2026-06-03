import { useContext } from "react";
import { CustomSlider } from "@/components/ui/camanjs/CustomSlider";
import { FilterContext } from "@/context/createContext";

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
  } = useContext(FilterContext);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://cdnjs.cloudflare.com/ajax/libs/camanjs/4.1.2/caman.full.min.js";
  //   script.onload = () => {
  //     if (!Caman || !croppedImageRef.current) return;

  //     Caman(croppedImageRef.current, function () {
  //       this.revert(false);
  //       this.brightness(brightness)
  //         .saturation(saturation)
  //         .exposure(exposure)
  //         .contrast(contrast)
  //         .vibrance(vibrance);

  //       this.render();
  //     });
  //   };
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!Caman || !croppedImageRef.current) return;

  //   Caman(croppedImageRef.current, function () {
  //     this.revert(false);
  //     this.brightness(brightness);
  //     this.saturation(saturation);
  //     this.exposure(exposure);
  //     this.contrast(contrast);
  //     this.vibrance(vibrance);

  //     this.render();
  //   });
  // }, [
  //   brightness,
  //   saturation,
  //   exposure,
  //   contrast,
  //   vibrance,
  //   croppedImageRef,
  //   Caman,
  // ]);

  return (
    <div>
      <CustomSlider
        label="Brightness"
        value={brightness}
        setValue={(value) => {
          setBrightness(value);
        }}
        maxValue={2}
        minValue={0}
        step={0.1}
        croppedImageRef={croppedImageRef}
      />
      <CustomSlider
        label="saturation"
        value={saturation}
        setValue={(value) => {
          setSaturation(value);
        }}
        maxValue={2}
        minValue={0}
        step={0.1}
        croppedImageRef={croppedImageRef}
      />
      <CustomSlider
        label="exposure"
        value={exposure}
        setValue={(value) => {
          setExposure(value);
        }}
        maxValue={2}
        minValue={0}
        step={0.1}
        croppedImageRef={croppedImageRef}
      />
      <CustomSlider
        label="contrast"
        value={contrast}
        setValue={(value) => {
          setContrast(value);
        }}
        maxValue={2}
        minValue={0}
        step={0.1}
        croppedImageRef={croppedImageRef}
      />
      <CustomSlider
        label="vibrance"
        value={vibrance}
        setValue={(value) => {
          setVibrance(value);
        }}
        maxValue={2}
        minValue={0}
        step={0.1}
        croppedImageRef={croppedImageRef}
      />
    </div>
  );
};
