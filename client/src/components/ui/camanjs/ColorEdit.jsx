import { useContext/*, useEffect*/ } from "react";
import { CustomSlider } from "@/components/ui/camanjs/CustomSlider";
import { FilterContext } from "@/context/createContext";
import { Button } from "../shadcn templates/button";
// const Caman = window.Caman;

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
    // sharpen,
    // setSharpen,
    hue,
    setHue,
    sepia,
    setSepia,
    resetFilter,
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
  //   const imgElement = croppedImageRef.current;

  //   if (
  //     !Caman ||
  //     !imgElement ||
  //     !imgElement?.nodename !== "IMG" ||
  //     !imgElement.complete ||
  //     imgElement.naturalWidth !== 0
  //   )
  //     return;

  //   // if (imgElement.complete && imgElement.naturalWidth !== 0) {
  //   //   applyFilter(imgElement);
  //   // } else {
  //   //   console.log(imgElement, imgElement?.nodename, Caman);
  //   //   const handleLoad = () => {
  //   //     applyFilter(imgElement);
  //   //   };

  //   //   imgElement.addEventListener("load", handleLoad);
  //   //   return () => imgElement.removeEventListener("load", handleLoad);
  //   // }

  //   // const applyFilter = (imgElement) => {

  //   console.log("reached!");

  //   new Caman(imgElement, function () {
  //     console.log(brightness, saturation, exposure, contrast, vibrance);
  //     console.log("running");
  //     // this.revert(false);
  //     this.brightness(brightness);
  //     this.saturation(saturation);
  //     this.exposure(exposure);
  //     this.contrast(contrast);
  //     this.vibrance(vibrance);
  //     this.render(function () {
  //       console.log("DONE");
  //     });
  //   });
  //   // };
  // }, [brightness, saturation, exposure, contrast, vibrance]);

  // useEffect(() => {
  //   const canvas = croppedImageRef.current;
  //   const caman = window?.Caman || Caman;

  //   if (!caman || !canvas || canvas.nodeName?.toUpperCase() !== "CANVAS")
  //     return;

  //   console.log('width-height :',canvas.width, canvas.height);
  //   console.log('datacaman id : ',canvas.getAttribute("data-caman-id"));

  //   caman(canvas, function () {
  //     this.revert(false);
  //     this.brightness(brightness);
  //     this.saturation(saturation);
  //     this.exposure(exposure);
  //     this.contrast(contrast);
  //     this.vibrance(vibrance);
  //     this.sepia(sepia);
  //     // this.sharpen(sharpen);
  //     this.hue(hue);
  //     this.render();
  //   });
  // }, [
  //   brightness,
  //   saturation,
  //   exposure,
  //   contrast,
  //   vibrance,
  //   sepia,
  //   // sharpen,
  //   hue,
  //   croppedImageRef,
  // ]);

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
        {/* <CustomSlider
        label="sharpen"
        value={sharpen}
        setValue={(value) => {
          setSharpen(value);
        }}
        minValue={0}
        maxValue={1}
        step={0.1}
        croppedImageRef={croppedImageRef}
      /> */}
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
