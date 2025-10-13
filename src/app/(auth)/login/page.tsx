import { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign In - Reviewslike",
  description:
    "Welcome back to Reviewslike! Sign in to continue reviewing games, managing your wishlist, and discovering new gaming experiences.",
};

const Login: React.FC = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex flex-col items-center justify-center gap-8 bg-darkBackground px-4 py-8"
    >
      {/* Welcome Back Section */}
      <div className="text-center max-w-xl mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-customWhite mb-4">
          Welcome Back!
        </h1>
        <p className="text-customWhite/90 text-lg md:text-xl mb-6">
          Ready to continue your gaming journey? Sign in to access your reviews,
          wishlist, and discover more amazing games.
        </p>
        <div className="flex items-center justify-center gap-4 text-customWhite/70 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Continue reviewing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Manage wishlist</span>
          </div>
        </div>
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
