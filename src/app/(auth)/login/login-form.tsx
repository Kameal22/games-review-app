"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { useToastStore } from "@/stores/toast-store";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormFields = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const { addToast } = useToastStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log("Login successful");
      // Store user data and token using the user store
      login(data.user, data.token);
      addToast({
        type: "success",
        title: "Login successful",
        message: `Welcome back, ${data.user.displayName}!`,
      });
      router.push("/dashboard");
    },
    onError: async (error: Error) => {
      console.log("Login error:", error.message);
      addToast({
        type: "error",
        title: "Login failed",
        message: error.message || "Invalid credentials, please try again.",
      });
      setError("root", {
        message: error.message || "Invalid credentials, please try again.",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await mutation.mutate(data);
    } catch {
      setError("root", { message: "Something went wrong, please try again." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
      <h1 className="text-3xl md:text-4xl text-customWhite text-center">
        Login
      </h1>

      <form
        className="flex flex-col items-center justify-center gap-6 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("email")}
            type="email"
            placeholder="Email *"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <div className="relative">
            <input
              className="p-3 rounded-xl w-full pr-12"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {errors.root && (
          <p className="text-red-500 text-center text-sm">
            {errors.root.message}
          </p>
        )}
        <button
          className="p-3 text-darkBackground bg-customWhite rounded-xl w-full font-medium"
          disabled={isSubmitting || mutation.isPending}
          type="submit"
        >
          {isSubmitting || mutation.isPending ? "Loading..." : "Submit"}
        </button>
      </form>

      <div className="w-full flex flex-col md:flex-row justify-center gap-4 text-center">
        <Link
          href="/register"
          className="text-sm md:text-base text-customWhite underline cursor-pointer"
        >
          New to Reviewslike? Sign up here
        </Link>
        {/* <Link
          href="/forgot-password"
          className="text-sm md:text-base text-customWhite underline cursor-pointer"
        >
          Forgot Password?
        </Link> */}
      </div>
    </div>
  );
};

export default LoginForm;
