import { useContext } from "react";
import ImageCropper from "./ImageCropper";
import { CropperContext } from "@/context/createContext";
import { ImageUpload } from "./ImageUpload";

export const ImageEdit = () => {
  const { imageSrc, currentAspectRatio } = useContext(CropperContext);

  return (
    <section className="flex flex-col justify-center gap-6">
      <ImageUpload />
      <div className="flex flex-row justify-center gap-3">
        <div className="w-full flex flex-col justify-center gap-4">
          <ImageCropper srcImage={imageSrc} aspectRatio={currentAspectRatio} />
        </div>
      </div>
    </section>
  );
};
