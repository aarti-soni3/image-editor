import { useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function ImageCropper({ srcImage, aspectRatio }) {
  const cropperRef = useRef(null);
  const currentImage = useRef(srcImage);
  const containerStyle = { height: 500, width: "100%" };
  const initialRatio = aspectRatio?.size
    ? aspectRatio.size.x / aspectRatio.size.y
    : 16 / 9;

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
    // const cropper = cropperRef.current?.cropper;
    // console.log("image croper data : ", cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Cropper
      ref={cropperRef}
      src={srcImage}
      style={containerStyle}
      initialAspectRatio={initialRatio}
      guides={false}
      crop={onCrop}
    />
  );
}
