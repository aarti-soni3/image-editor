import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../shadcn templates/button";

export default function ImageCropper({ srcImage, aspectRatio }) {
  const cropperRef = useRef(null);
  const currentImage = useRef(srcImage);
  const containerStyle = { height: 500, width: "100%" };
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
      <Cropper
        ref={cropperRef}
        src={srcImage}
        style={containerStyle}
        initialAspectRatio={initialRatio}
        guides={false}
        crop={onCrop}
      />

      <Button onClick={onCrop}>Crop</Button>

      {croppedImage && (
        <>
          <h4>Cropped Image Preview</h4>
          <img src={croppedImage} className="w-100"/>
        </>
      )}
    </>
  );
}
