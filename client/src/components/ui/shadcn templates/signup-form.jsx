import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn templates/button";
import { Card, CardContent } from "@/components/ui/shadcn templates/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/shadcn templates/field";
import CustomField from "../../Common/CustomField";

export function SignupForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <FieldGroup className="grid max-w-sm grid-cols-1 md:grid-cols-2 gap-2">
                <CustomField
                  fieldLabel="Name"
                  htmlFor="name"
                  inputId="name"
                  inputType="text"
                  inputPlaceHolder="Max Leiter"
                />
                <CustomField
                  fieldLabel="Username"
                  htmlFor="username"
                  inputId="username"
                  inputType="text"
                  inputPlaceHolder="max-leiter"
                  // fieldDescription="Choose a unique username for your account."
                />
              </FieldGroup>
              <FieldGroup className="grid max-w-sm grid-cols-1 md:grid-cols-2 gap-2">
                <CustomField
                  fieldLabel="Mobile No."
                  htmlFor="mobile"
                  inputId="mobile"
                  inputType="tel"
                  inputPlaceHolder="9966331188"
                  // fieldDescription="Choose a unique username for your account."
                />
                <CustomField
                  fieldLabel="Email"
                  htmlFor="email"
                  inputId="email"
                  inputType="email"
                  inputPlaceHolder="m@example.com"
                  // fieldDescription="Choose a unique username for your account."
                />
              </FieldGroup>
              <FieldGroup className="grid max-w-sm grid-cols-1 md:grid-cols-2 gap-2">
                <CustomField
                  fieldLabel="Password"
                  htmlFor="password"
                  inputId="password"
                  inputType="password"
                  inputPlaceHolder="••••••••"
                  // fieldDescription=" Must be at least 8 characters long."
                />
                <CustomField
                  fieldLabel="Confirm Password"
                  htmlFor="cpassword"
                  inputId="cpassword"
                  inputType="password"
                  inputPlaceHolder="••••••••"
                  // fieldDescription=" Must be at least 8 characters long."
                />
              </FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <FieldDescription className="text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1629184510982-cf91280c1d53?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
