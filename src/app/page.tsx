"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default function HomePage() {
  const router = useRouter();
  useEffect(()=>{
    router.push("/users")
  
  })
  return (
    <>
      <div className="h-screen flex items-center justify-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
      </div>
    </>
  );
}
