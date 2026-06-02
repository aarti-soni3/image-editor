import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../shadcn templates/button";
import { ImageRatio } from "./ImageRatio";

export default function ImageCropper({ srcImage, aspectRatio }) {
  const cropperRef = useRef(null);
  const currentImage = useRef(srcImage);
  const containerStyle = { height: "100%", width: "100%" };
  const initialRatio = aspectRatio?.size
    ? aspectRatio.size.x / aspectRatio.size.y
    : 16 / 9;

  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && aspectRatio?.size) {
      const ratio = aspectRatio.size.x / aspectRatio.size.y;
      cropper.setAspectRatio(ratio);
    }
  }, [aspectRatio]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && srcImage && srcImage !== currentImage.current) {
      cropper.replace(srcImage);
      currentImage.current = srcImage;
    }
  }, [srcImage]);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const getCroppedCanvas = cropper.getCroppedCanvas();
    setCroppedImage(getCroppedCanvas.toDataURL());
    // console.log("image croper data : ", cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row align-middle justify-center xl:justify-between gap-8">
        {croppedImage && (
          <div className="flex flex-col grow-0 gap-2">
            <h4>Cropped Image Preview</h4>
            <img src={croppedImage} className="w-100" />
          </div>
        )}
        <div className="flex flex-col grow-1 gap-2">
          <h4>Edit Image Preview</h4>
          <div className="w-auto">
            <Cropper
              ref={cropperRef}
              src={srcImage}
              style={containerStyle}
              initialAspectRatio={initialRatio}
              guides={false}
              crop={onCrop}
            />
          </div>
          <ImageRatio />
          <Button onClick={onCrop}>Crop</Button>
        </div>
      </div>
    </>
  );
}
