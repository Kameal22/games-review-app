"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { loginUser } from "./utils";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const scheema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormFields = z.infer<typeof scheema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(scheema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      console.log("Success log");
      Cookies.set("auth_token", "token123", { expires: 7 });
      // Navigate or perform other actions after success
      router.push("/dashboard");
    },
    onError: async (error) => {
      console.log("Error:", error);
      setError("root", { message: "Invalid credentials, please try again." });
    },
    onSettled: async () => {
      console.log("Settled log");
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Await the mutation to ensure isSubmitting works correctly
      await mutation.mutateAsync(data);
    } catch (e) {
      setError("root", { message: "Something went wrong, please try again." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full">
      <h1 className="text-4xl text-customWhite">Login</h1>

      <form
        className="flex flex-col items-center justify-center gap-6 w-[520px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("email")}
            type="text"
            placeholder="Email *"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
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
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <button
          className="p-2 text-darkBackground bg-customWhite rounded-xl w-full"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading.." : "Submit"}
        </button>
      </form>

      <div className="w-full flex justify-center gap-4">
        <Link
          href="/register"
          className="text-s text-customWhite underline cursor-pointer"
        >
          New to Reviewslike? Sign up here
        </Link>
        <Link
          href="/forgot-password"
          className="text-s text-customWhite underline cursor-pointer"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
