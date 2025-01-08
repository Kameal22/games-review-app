"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  //Navigate programmatically after an action - router.push("route-name")
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-notFoundText">Register</h1>

      <Link
        href="/login"
        className="text-m text-notFoundText underline cursor-pointer"
      >
        Alread have an account? Sign In
      </Link>
    </div>
  );
};

export default RegisterForm;
