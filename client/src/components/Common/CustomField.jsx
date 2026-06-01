import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/shadcn templates/field";
import { Input } from "@/components/ui/shadcn templates/input";
import { forwardRef } from "react";

const CustomField = forwardRef(
  (
    {
      fieldLabel,
      htmlFor,
      inputId,
      inputType,
      inputPlaceHolder,
      fieldDescription,
      error,
      ...rest
    },
    ref,
  ) => {
    return (
      <Field data-invalid={error ? true : false}>
        <FieldLabel htmlFor={htmlFor}>{fieldLabel}</FieldLabel>
        <Input
          id={inputId}
          type={inputType}
          placeholder={inputPlaceHolder}
          ref={ref}
          {...rest}
          // required
        />
        {fieldDescription && (
          <FieldDescription>{fieldDescription}</FieldDescription>
        )}
        {error && (
          <FieldDescription className="text-red-600">
            {error.message}
          </FieldDescription>
        )}
      </Field>
    );
  },
);

// CustomField.displayName="CustomField";
export default CustomField;
