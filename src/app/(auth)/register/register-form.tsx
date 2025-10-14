"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { useToastStore } from "@/stores/toast-store";

//Zod schema for validation
const schema = z
  .object({
    displayName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormFields = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const { addToast } = useToastStore();
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
        title: "Registration successful",
        message: `Welcome to Reviewslike, ${data.user.displayName}!`,
      });
      router.push("/dashboard");
    },
    onError: async (error: Error) => {
      console.log("Registration error:", error.message);
      addToast({
        type: "error",
        title: "Registration failed",
        message: error.message || "Something went wrong, please try again.",
      });
      setError("root", {
        message: error.message || "Something went wrong, please try again.",
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
        Register
      </h1>

      <form
        className="flex flex-col items-center justify-center gap-6 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("displayName")}
            type="text"
            placeholder="Display Name *"
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
            placeholder="Email *"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("password")}
            type="password"
            placeholder="Password *"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("confirm_password")}
            type="password"
            placeholder="Confirm Password *"
          />
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
          {isSubmitting || mutation.isPending ? "Loading..." : "Submit"}
        </button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm md:text-base text-customWhite underline cursor-pointer"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
