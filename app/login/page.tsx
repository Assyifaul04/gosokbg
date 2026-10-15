import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-50 p-6 dark:bg-black">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}