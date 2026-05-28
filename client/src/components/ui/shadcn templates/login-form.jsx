import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn templates/button";
import { Card, CardContent } from "@/components/ui/shadcn templates/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  // FieldLabel,
  FieldSeparator,
} from "@/components/ui/shadcn templates/field";
// import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import CustomField from "../../Common/CustomField";

export function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
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
              />
              <CustomField
                fieldLabel="Password"
                htmlFor="password"
                inputId="password"
                inputType="password"
                inputPlaceHolder="••••••••"
              />
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>
              <FieldDescription className="text-center">
                Don&apos;t have an account?
                <Button variant="link" aschild>
                  <NavLink
                    to=""
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Sign up
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
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
