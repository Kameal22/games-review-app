"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerUser } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { useToastStore } from "@/stores/toast-store";

//Zod schema for validation
const schema = z
  .object({
    displayName: z
      .string()
      .min(3, "Nazwa wyświetlana musi mieć co najmniej 3 znaki"),
    email: z.string().email("Nieprawidłowy adres email"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    confirm_password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Hasła nie są identyczne",
    path: ["confirm_password"],
  });

type FormFields = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const { addToast } = useToastStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Store user data and token using the user store
      login(data.user, data.token);
      addToast({
        type: "success",
        title: "Rejestracja udana",
        message: `Witaj w Reviewslike, ${data.user.displayName}!`,
      });
      router.push("/dashboard");
    },
    onError: async (error: Error) => {
      addToast({
        type: "error",
        title: "Rejestracja nie powiodła się",
        message: error.message || "Coś poszło nie tak, spróbuj ponownie.",
      });
      setError("root", {
        message: error.message || "Coś poszło nie tak, spróbuj ponownie.",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await mutation.mutate(data);
    } catch {
      setError("root", { message: "Coś poszło nie tak, spróbuj ponownie." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
      <form
        className="flex flex-col items-center justify-center gap-6 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("displayName")}
            type="text"
            placeholder="Nazwa wyświetlana *"
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.displayName.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("email")}
            type="email"
            placeholder="Adres email *"
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
              placeholder="Hasło *"
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
        <div className="w-full">
          <div className="relative">
            <input
              className="p-3 rounded-xl w-full pr-12"
              {...register("confirm_password")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Potwierdź hasło *"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? (
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
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
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
          {isSubmitting || mutation.isPending
            ? "Ładowanie..."
            : "Zarejestruj się"}
        </button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm md:text-base text-customWhite underline cursor-pointer"
        >
          Masz już konto? Zaloguj się
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
