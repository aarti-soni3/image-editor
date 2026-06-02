import { useState } from "react";
import { CropperContext } from "./createContext";

export const CropperProvider = ({ children }) => {
  const defaultImage =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const aspectRatioSize = {
    widescreen: {
      name: "16:9",
      size: {
        x: 16,
        y: 9,
      },
    },
    classic: {
      name: "3:2",
      size: {
        x: 3,
        y: 2,
      },
    },
    television: {
      name: "4:3",
      size: {
        x: 4,
        y: 3,
      },
    },
    square: {
      name: "1:1",
      size: {
        x: 1,
        y: 1,
      },
    },
  };

  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [aspectRatioKey, setAspectRatioKey] = useState("square");
  const currentAspectRatio = aspectRatioSize[aspectRatioKey];

  return (
    <CropperContext.Provider
      value={{
        imageSrc,
        setImageSrc,
        aspectRatioKey,
        setAspectRatioKey,
        currentAspectRatio,
        aspectRatioSize,
      }}
    >
      {children}
    </CropperContext.Provider>
  );
};
