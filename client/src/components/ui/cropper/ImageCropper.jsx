import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "../shadcn templates/button";
import { ImageRatio } from "./ImageRatio";
import { useContext } from "react";
import {
  CropperContext,
  FilterContext,
  ToastContext,
} from "@/context/createContext";
import { useCropMutation } from "@/store/services/imageApiSlice";
import { ColorEdit } from "../camanjs/ColorEdit";
import { useCamanFilter } from "@/hooks/useCamanFilter.js";

export default function ImageCropper() {
  const {
    imageSrc: srcImage,
    currentAspectRatio: aspectRatio,
    isUploadError,
  } = useContext(CropperContext);

  const {
    brightness,
    saturation,
    exposure,
    contrast,
    vibrance,
    sharpen,
    sepia,
    hue,
    resetFilter,
  } = useContext(FilterContext);

  const { showErrorToast, showSuccessToast } = useContext(ToastContext);

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [crop, { isLoading, error }] = useCropMutation();

  const cropperRef = useRef(null);
  const currentImage = useRef(srcImage);
  const croppedImageRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const containerStyle = { height: "100%", width: "75%" };
  const initialRatio = aspectRatio?.size
    ? aspectRatio.size.x / aspectRatio.size.y
    : 16 / 9;

  useCamanFilter(croppedImageRef, isCanvasReady);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && aspectRatio?.size) {
      const ratio = aspectRatio.size.x / aspectRatio.size.y;
      cropper.setAspectRatio(ratio);
    }
  }, [aspectRatio]); //called when aspect ratio changes

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    setIsCanvasReady(false);
    setCroppedImage(croppedCanvas.toDataURL());
  }; //called when cropper box selection changes

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;

    if (cropper && srcImage && srcImage !== currentImage.current) {
      cropper.replace(srcImage);
      currentImage.current = srcImage;
      resetFilter();
      setCroppedImage(null);
      setIsCanvasReady(false);
    }
  }, [srcImage, resetFilter]); //called when src image changes

  useEffect(() => {
    const canvas = croppedImageRef.current;

    if (!canvas || !croppedImage || canvas.nodeName?.toUpperCase() !== "CANVAS")
      return;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.removeAttribute("data-caman-id");
      ctx.drawImage(img, 0, 0);
      setIsCanvasReady(true);
    };

    img.src = croppedImage;
  }, [croppedImage]);

  const handleUpload = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    setIsProcessing(true);

    const windowName = `image-processor${Date.now()}`;
    const newWindow = window.open("about:blank", windowName);

    if (newWindow) {
      // newWindow.location.replace("about:blank");
      newWindow.document.documentElement.innerHTML = `
        <html>
          <head>
            <title>Processing Image...</title>
            <style>
              body { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; background: #f0f2f5; color: #333; }
              .spinner { border: 4px solid rgba(0,0,0,0.1); width: 40px; height: 40px; border-radius: 50%; border-left-color: #075; animation: spin 1s linear infinite; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <div class="spinner"></div>
            <p style="margin-top: 15px; font-weight: bold; font-size:20px">Applying color correction... Please wait.</p>
          </body>
        </html>
      `;
    }

    try {
      const imageData = cropper.getData(true);
      const formData = new FormData();

      const fetchedImage = await fetch(srcImage);
      const blob = await fetchedImage.blob();

      const file = new File([blob], "source-img.jpg", {
        type: blob.type || "image/jpeg",
      });

      const filterData = {
        brightness,
        saturation,
        exposure,
        contrast,
        vibrance,
        sharpen,
        sepia,
        hue,
      };

      formData.append("image", file);
      formData.append("imageData", JSON.stringify(imageData));
      formData.append("filterData", JSON.stringify(filterData));

      const res = await crop(formData);

      if (newWindow && res?.data) {
        newWindow.location.href = res?.data?.image;
      } else {
        throw new Error("No Image URL Received!");
      }

      showSuccessToast(res?.data?.message || res.data?.data?.message);
    } catch (error) {
      showErrorToast(error?.data?.message || error?.message);

      if (newWindow) newWindow.close();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
          ready={onCrop}
          // cropend={onCrop}
          // initialAspectRatio={0} zoomTo={0.5} minCropBoxHeight={10} minCropBoxWidth={10}
          // background={false} responsive={true} autoCropArea={1} checkOrientation={false}
        />
        <ImageRatio />
        <Button
          onClick={handleUpload}
          disabled={isLoading || isUploadError ? true : false}
        >
          {isProcessing ? "Processing image" : "Apply Filter"}
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
            <canvas
              ref={croppedImageRef}
              id="cropped-image"
              className="w-100"
            />
          </>
        )}

        <ColorEdit croppedImageRef={croppedImageRef} />
      </div>
    </div>
  );
}
