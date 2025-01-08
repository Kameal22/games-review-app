import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Un page.",
};

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen bg-notFoundBackground">
      <RegisterForm />
    </div>
  );
};

export default Register;
