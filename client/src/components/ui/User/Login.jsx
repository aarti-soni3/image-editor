import { LoginForm } from "@/components/ui/shadcn templates/login-form";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center bg-muted">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
