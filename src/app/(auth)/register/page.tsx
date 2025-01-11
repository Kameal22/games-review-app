import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Un page.",
};

const Register: React.FC = () => {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex flex-col items-center justify-center gap-4 bg-darkBackground"
    >
      <RegisterForm />
    </div>
  );
};

export default Register;
