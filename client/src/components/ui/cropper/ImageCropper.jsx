import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../shadcn templates/button";
import { ImageRatio } from "./ImageRatio";
import { useContext } from "react";
import { CropperContext } from "@/context/createContext";
import { useCropMutation } from "@/store/services/imageApiSlice";
// import { ColorEdit } from "../camanjs/ColorEdit";

export default function ImageCropper() {
  const {
    imageSrc: srcImage,
    currentAspectRatio: aspectRatio,
    isUploadError,
  } = useContext(CropperContext);

  const [crop, { data, isLoading, error }] = useCropMutation();

  const cropperRef = useRef(null);
  const currentImage = useRef(srcImage);
  const containerStyle = { height: "100%", width: "75%" };
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
    const croppedCanvas = cropper.getCroppedCanvas();
    setCroppedImage(croppedCanvas.toDataURL());
    // console.log("image croper data : ", cropper.getCroppedCanvas().toDataURL());
  };

  // const handleDownload = () => {
  //   if (isUploadError) return;

  //   const cropper = cropperRef.current?.cropper;
  //   const croppedCanvas = cropper.getCroppedCanvas();

  //   if (croppedCanvas) {
  //     const dataURL = croppedCanvas.toDataURL("image/png");

  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = dataURL;
  //     downloadLink.download = "cropped-img.png";

  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //   }
  // };

  const handleUpload = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    try {
      const imageData = cropper.getData(true);
      const formData = new FormData();

      const fetchedImage = await fetch(srcImage);
      const blob = await fetchedImage.blob();

      const file = new File([blob], "source-img.jpg", {
        type: blob.type || "image/jpeg",
      });

      console.log("file : ", file);
      console.log("imageData : ", imageData);

      formData.append("image", file);
      formData.append("imageData", JSON.stringify(imageData));

      const res = await crop(formData);
      // console.log("res data : ", res.data);
      // console.log("mutation data : ", data);
    } catch (error) {
      console.log("errrrr : ", error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col xl:flex-row align-middle justify-center xl:justify-normal gap-8">
        <div className="flex flex-col gap-2">
          <h4>Edit Image Preview</h4>
          <Cropper
            ref={cropperRef}
            style={containerStyle}
            src={srcImage}
            aspectRatio={initialRatio}
            viewMode={1}
            guides={true}
            crop={onCrop}
            // initialAspectRatio={0}
            // zoomTo={0.5}
            // minCropBoxHeight={10}
            // minCropBoxWidth={10}
            // background={false}
            // responsive={true}
            // autoCropArea={1}
            // checkOrientation={false}
          />
          <ImageRatio />
          <Button onClick={handleUpload} disabled={isLoading ? true : false}>
            Crop & Save
          </Button>

          {error && <div className="text-red-700">{error.message}</div>}

          {isUploadError && (
            <div className="text-red-700">
              Can't save image please upload another image!
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 min-w-50 max-w-100">
          {croppedImage && (
            <>
              <h4>Cropped Image Preview</h4>
              <img src={croppedImage} className="w-100" />
            </>
          )}

          {/* <ColorEdit /> */}
        </div>
      </div>
    </>
  );
}
