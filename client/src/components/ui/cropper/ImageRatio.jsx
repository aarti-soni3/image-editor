import { RadioGroup, RadioGroupItem } from "../shadcn templates/radio-group";
import { Label } from "../shadcn templates/label";
import { useContext } from "react";
import { CropperContext } from "@/context/createContext";

export const ImageRatio = () => {
  const { aspectRatioKey, setAspectRatioKey, aspectRatioSize } =
    useContext(CropperContext);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-2 p-2 lg:gap-5 text-center justify-center">
      <h6 className="font-bold">Aspect Ratio :</h6>

      {/* use value here not default value in radio group for specifing default value */}
      <RadioGroup
        value={aspectRatioKey}
        className="lg:w-fit flex flex-row justify-center gap-3"
        onValueChange={(key) => setAspectRatioKey(key)}
      >
        {Object.keys(aspectRatioSize).map((key) => {
          const item = aspectRatioSize[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <RadioGroupItem
                value={key}
                id={key}
                className="border border-emerald-700"
              />
              <Label htmlFor={key}>{item.name}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
