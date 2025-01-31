"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const scheema = z.object({
  email: z.string().email(),
});

type FormFields = z.infer<typeof scheema>;

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
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
      router.push("/dashboard");
    } catch (e) {
      setError("email", { message: "This email is already taken" }); //There also is a "root" field that will be displayed under the form. Not under a specific field.
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <h1 className="text-4xl text-customWhite">Forgot Password</h1>

      <form
        className="flex flex-col items-center justify-center gap-6 w-[420px]"
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
        <button
          className="p-2 text-darkBackground bg-customWhite rounded-xl w-full"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading.." : "Submit"}
        </button>
      </form>

      <div className="w-full flex justify-between gap-4">
        <Link
          href="/register"
          className="text-s text-customWhite underline cursor-pointer"
        >
          New to Reviewslike? Sign up here
        </Link>
        <Link
          href="/login"
          className="text-s text-customWhite underline cursor-pointer"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
