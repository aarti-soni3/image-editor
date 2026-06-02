import ImageCropper from "./ImageCropper";
import { ImageUpload } from "./ImageUpload";

export const ImageEdit = () => {
  return (
    <section className="flex flex-col justify-center gap-6">
      <ImageUpload />
      <ImageCropper />
    </section>
  );
};
