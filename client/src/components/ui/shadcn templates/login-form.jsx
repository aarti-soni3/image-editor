import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn templates/button";
import { Card, CardContent } from "@/components/ui/shadcn templates/card";
import {
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/shadcn templates/field";
import { NavLink } from "react-router";
import CustomField from "../../Common/CustomField";
import { useForm } from "react-hook-form";
import { registerValidationRules } from "@/utils/form-validations";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const loginValidationRule = {
    email: registerValidationRules.email,
    password: registerValidationRules.password,
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your PicBlend account
                </p>
              </div>
              <CustomField
                fieldLabel="Email"
                htmlFor="email"
                inputId="email"
                inputType="email"
                inputPlaceHolder="m@example.com"
                error={errors.email}
                {...register("email", loginValidationRule.email)}
                aria-invalid={errors.email ? true : false}
              />
              <CustomField
                fieldLabel="Password"
                htmlFor="password"
                inputId="password"
                inputType="password"
                inputPlaceHolder="••••••••"
                error={errors.password}
                {...register("password", loginValidationRule.password)}
                aria-invalid={errors.password ? true : false}
              />
              <Button type="submit">Login</Button>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <FieldDescription className="text-center">
                Don&apos;t have an account?
                <Button variant="link" aschild>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Register
                  </NavLink>
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1507208773393-40d9fc670acf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
