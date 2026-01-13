// import { Metadata } from "next";
import LoginForm from "./login-form";

// export const metadata: Metadata = {
//   title: "Sign In - Reviewslike",
//   description:
//     "Sign in to Reviewslike to review games, manage your wishlist, and discover new gaming experiences.",
// };

const Login: React.FC = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex flex-col items-center justify-center gap-8 bg-darkBackground px-4 py-8"
    >
      <div className="text-center max-w-xl mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-customWhite mb-4">
          Sign In
        </h1>
        <p className="text-customWhite/90 text-lg md:text-xl mb-6">
          Access your account to review games, manage your wishlist, and
          discover amazing gaming experiences.
        </p>
        <div className="flex items-center justify-center gap-4 text-customWhite/70 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Write reviews</span>
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
