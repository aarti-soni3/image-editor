import { useState } from "react";
import { FilterContext } from "./createContext";

export const FilterProvider = ({ children }) => {
  const [brightness, setBrightness] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [vibrance, setVibrance] = useState(0);
  const [sharpen, setSharpen] = useState(0);
  const [hue, setHue] = useState(0);
  const [sepia, setSepia] = useState(0);

  const resetFilter = () => {
    setBrightness(0);
    setSaturation(0);
    setExposure(0);
    setContrast(0);
    setVibrance(0);
    setSharpen(0);
    setHue(0);
    setSepia(0);
  };

  const reapplyFilter = () => {
    setBrightness(brightness);
    setSaturation(saturation);
    setExposure(exposure);
    setContrast(contrast);
    setVibrance(vibrance);
    setSharpen(sharpen);
    setHue(hue);
    setSepia(sepia);
  };

  const resetAndApply=()=>{
    resetFilter();
    reapplyFilter();
  }

  return (
    <FilterContext.Provider
      value={{
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
        reapplyFilter,
        resetAndApply,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
