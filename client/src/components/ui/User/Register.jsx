// import { FieldGroup, FieldSet } from "@/components/ui/field";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import CustomField from "@/components/Common/CustomField";
// import { Blend } from "lucide-react";
import { SignupForm } from "@/components/ui/shadcn templates/signup-form";

export function Register() {
  return (
     <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
    // <section className="w-full h-full flex flex-col justify-center items-center">
    // <div className="w-full grid min-h-svh lg:grid-cols-2">
    //   <div className="flex flex-col gap-4 p-6 md:p-10">
    //     <div className="flex justify-center gap-2 md:justify-start">
    //       <a href="#" className="flex items-center gap-2 font-medium">
    //         <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
    //           <Blend className="size-4" />
    //         </div>
    //         PicBlend
    //       </a>
    //     </div>
    //     <div className="flex flex-1 items-center justify-center">
    //       <div className="w-full max-w-xs">
    //         <SignupForm />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="relative hidden bg-muted lg:block">
    //     <img
    //       src="https://images.unsplash.com/photo-1629184510982-cf91280c1d53?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //       alt="Image"
    //       className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    //     />
    //   </div>
    // </div>
    /* <Card className="w-full max-w-xs md:max-w-md">
        <CardHeader>
          <CardTitle>Register Account</CardTitle>
          <CardAction>
            <Button variant="link">Log in</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldSet className="w-full max-w-xs md:max-w-md">
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
            </FieldSet>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </Card> */
    // </section>
  );
}
