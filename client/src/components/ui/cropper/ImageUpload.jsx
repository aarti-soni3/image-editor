import CustomField from "@/components/Common/CustomField";
import { useForm } from "react-hook-form";
import { fileValidation } from "@/utils/form-validations";
import { useContext, useEffect } from "react";
import { CropperContext } from "@/context/createContext";

export const ImageUpload = () => {
  const { setImageSrc, setIsUploadError } = useContext(CropperContext);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fileList = watch("image");
  const selectedFile = fileList && fileList.length > 0 ? fileList[0] : null;

  useEffect(() => {
    if (errors.image) {
      setIsUploadError(errors.image);
    } else setIsUploadError(false);
  }, [setIsUploadError, errors.image]);

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageSrc(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile, setImageSrc]);

  return (
    <CustomField
      fieldLabel="Upload Image"
      htmlFor="image"
      inputId="image"
      inputType="file"
      fieldDescription="Select image to upload"
      error={errors.image}
      {...register("image", fileValidation.image)}
      aria-invalid={errors.image ? true : false}
      accept="image/*"
    />
  );
};
