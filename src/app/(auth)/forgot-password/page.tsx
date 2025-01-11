import { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password page.",
};

const ForgotPassword: React.FC = () => {
  return (
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="flex flex-col items-center justify-center gap-4 bg-darkBackground"
    >
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
