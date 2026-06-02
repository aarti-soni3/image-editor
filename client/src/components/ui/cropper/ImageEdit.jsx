import { RadioGroup, RadioGroupItem } from "../shadcn templates/radio-group";
import { Label } from "../shadcn templates/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomField from "@/components/Common/CustomField";
import { fileValidation } from "@/utils/form-validations";
import ImageCropper from "./ImageCropper";

export const ImageEdit = () => {
  const defaultImage =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [imageSrc, setImageSrc] = useState(defaultImage);

  const fileList = watch("image");
  const selectedFile = fileList && fileList.length > 0 ? fileList[0] : null;

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageSrc(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  const aspectRatioSize = {
    widescreen: {
      name: "16:9",
      size: {
        x: 16,
        y: 9,
      },
    },
    classic: {
      name: "3:2",
      size: {
        x: 3,
        y: 2,
      },
    },
    television: {
      name: "4:3",
      size: {
        x: 4,
        y: 3,
      },
    },
    square: {
      name: "1:1",
      size: {
        x: 1,
        y: 1,
      },
    },
  };

  const [aspectRatioKey, setAspectRatioKey] = useState("square");
  const currentAspectRatio = aspectRatioSize[aspectRatioKey];

  return (
    <section className="flex flex-col justify-center gap-8">
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

      <div className="flex flex-row justify-between gap-6">
        <div className="flex flex-col justify-center gap-4">
          <ImageCropper srcImage={imageSrc} aspectRatio={currentAspectRatio} />
          <div className="w-full flex flex-row gap-5 justify-center">
            <h6 className="font-bold">Aspect Ratio :</h6>

            {/* use value here not default value in radio group for specifing default value */}
            <RadioGroup
              value={aspectRatioKey}
              className="w-fit flex flex-row gap-3"
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

          
        </div>
      </div>
    </section>
  );
};
