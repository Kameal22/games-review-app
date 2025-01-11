"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { registerUser } from "./utils";
import { useMutation } from "@tanstack/react-query";

//Zod scheema for validation
const scheema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormFields = z.infer<typeof scheema>;

const RegisterForm: React.FC = () => {
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
    mutationFn: registerUser,
    onSuccess: async () => {
      console.log("Success log");
      // Cookies.set("auth_token", "token123", { expires: 7 });
    },
    onSettled: async () => {
      console.log("Settled log");
    },
    onError: async () => {
      console.log("Error");
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await mutation.mutate(data);
    } catch (e) {
      setError("root", { message: "Something went wrong, please try again." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full">
      <h1 className="text-4xl text-customWhite">Register</h1>

      <form
        className="flex flex-col items-center justify-center gap-6 w-[520px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("name")}
            type="text"
            placeholder="Name *"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
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
            type="text"
            placeholder="Password *"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            className="p-3 rounded-xl w-full"
            {...register("confirm_password")}
            type="text"
            placeholder="Confirm Password *"
          />
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password.message}</p>
          )}
        </div>
        <button
          className="p-2 text-darkBackground bg-customWhite rounded-xl w-full"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading.." : "Submit"}
        </button>
      </form>

      <div>
        <Link
          href="/login"
          className="text-m text-customWhite underline cursor-pointer"
        >
          Alread have an account? Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
