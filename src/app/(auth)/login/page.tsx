import { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In page.",
};

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen bg-notFoundBackground">
      <LoginForm />
    </div>
  );
};

export default Login;
