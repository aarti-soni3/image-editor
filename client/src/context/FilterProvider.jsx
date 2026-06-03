import { useState } from "react";
import { FilterContext } from "./createContext";

export const FilterProvider = ({ children }) => {
  const [brightness, setBrightness] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [exposure, setExposure] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [vibrance, setVibrance] = useState(1);

  const filterStyle = {
    filter: `brightness(${brightness}) brightness(${exposure}) saturate(${saturation}) saturate(${vibrance}) contrast(${contrast})`,
  };

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
        filterStyle,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
