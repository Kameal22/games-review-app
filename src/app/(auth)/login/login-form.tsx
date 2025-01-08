"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const scheema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof scheema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(scheema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // throw new Error(); Mocking an API error here
      console.log(data);
    } catch (e) {
      setError("email", { message: "This email is already taken" }); //There also is a "root" field that will be displayed under the form. Not under a specific field.
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-notFoundText">Login</h1>

      <form
        className="flex flex-col items-center justify-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input {...register("email")} type="text" placeholder="Email *" />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="text"
            placeholder="Password *"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading.." : "Submit"}
        </button>
      </form>

      <Link
        href="/register"
        className="text-m text-notFoundText underline cursor-pointer"
      >
        New to Rate It? Sign up here
      </Link>
    </div>
  );
};

export default LoginForm;
