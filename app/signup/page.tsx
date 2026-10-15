import { SignupForm } from "@/components/signup/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-50 p-6 dark:bg-black">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
