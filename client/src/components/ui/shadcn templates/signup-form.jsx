import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn templates/button";
import { Card, CardContent } from "@/components/ui/shadcn templates/card";
import {
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/shadcn templates/field";
import CustomField from "../../Common/CustomField";
import { useForm } from "react-hook-form";
import { registerValidationRules } from "@/utils/form-validations";
import { NavLink } from "react-router";
import { useRegisterMutation } from "@/store/services/authApiSlice";

export function SignupForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { data, error, isLoading }] = useRegisterMutation();

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      await registerUser(formData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
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
                  error={errors.name}
                  {...register("name", registerValidationRules.name)}
                  aria-invalid={errors.name ? true : false}
                />
                <CustomField
                  fieldLabel="Username"
                  htmlFor="username"
                  inputId="username"
                  inputType="text"
                  inputPlaceHolder="max-leiter"
                  error={errors.username}
                  {...register("username", registerValidationRules.username)}
                  aria-invalid={errors.username ? true : false}
                />
              </FieldGroup>
              <FieldGroup className="grid max-w-sm grid-cols-1 md:grid-cols-2 gap-2">
                <CustomField
                  fieldLabel="Mobile No."
                  htmlFor="mobile"
                  inputId="mobile"
                  inputType="tel"
                  inputPlaceHolder="9966331188"
                  error={errors.mobile}
                  {...register("mobile", registerValidationRules.mobile)}
                  aria-invalid={errors.mobile ? true : false}
                />
                <CustomField
                  fieldLabel="Email"
                  htmlFor="email"
                  inputId="email"
                  inputType="email"
                  inputPlaceHolder="m@example.com"
                  error={errors.email}
                  {...register("email", registerValidationRules.email)}
                  aria-invalid={errors.email ? true : false}
                />
              </FieldGroup>
              <FieldGroup className="grid max-w-sm grid-cols-1 md:grid-cols-2 gap-2">
                <CustomField
                  fieldLabel="Password"
                  htmlFor="password"
                  inputId="password"
                  inputType="password"
                  inputPlaceHolder="••••••••"
                  error={errors.password}
                  {...register("password", registerValidationRules.password)}
                  aria-invalid={errors.password ? true : false}
                />
                <CustomField
                  fieldLabel="Confirm Password"
                  htmlFor="cpassword"
                  inputId="cpassword"
                  inputType="password"
                  inputPlaceHolder="••••••••"
                  error={errors.password}
                  aria-invalid={errors.password ? true : false}
                />
              </FieldGroup>
              <Button type="submit" disabled={isLoading ? true : false}>
                Create Account
              </Button>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Button variant="link" aschild>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Log In
                  </NavLink>
                </Button>
              </FieldDescription>
              {error && <p>error in fetching: {error.data.message}</p>}
              {data && <p>response received : {data.message}</p>}
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
