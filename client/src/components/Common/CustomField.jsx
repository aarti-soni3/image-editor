import { Field, FieldDescription, FieldLabel } from "@/components/ui/shadcn templates/field";
import { Input } from "@/components/ui/shadcn templates/input";

export default function CustomField({
  fieldLabel,
  htmlFor,
  inputId,
  inputType,
  inputPlaceHolder,
  fieldDescription,
}) {
  return (
    <Field>
      <FieldLabel htmlFor={htmlFor}>{fieldLabel}</FieldLabel>
      <Input id={inputId} type={inputType} placeholder={inputPlaceHolder} />
      {fieldDescription && (
        <FieldDescription>{fieldDescription}</FieldDescription>
      )}
    </Field>
  );
}
