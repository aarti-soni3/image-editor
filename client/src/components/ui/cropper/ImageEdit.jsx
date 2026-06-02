import ImageCropper from "./ImageCropper";
import { ImageUpload } from "./ImageUpload";

export const ImageEdit = () => {
  return (
    <section className="flex flex-col justify-center gap-6">
      <ImageUpload />
      <div className="flex flex-row justify-center gap-3">
        <div className="w-full flex flex-col justify-center gap-4">
          <ImageCropper />
        </div>
      </div>
    </section>
  );
};
