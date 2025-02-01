import { LoginForm } from "@/components/login-form";

export default function HomePage() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-black p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
